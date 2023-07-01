package com.quiz.quiz.service;

import com.quiz.quiz.dto.user.AuthRequest;
import com.quiz.quiz.dto.user.AuthenticationResponse;
import com.quiz.quiz.dto.user.RegisterRequest;
import com.quiz.quiz.dto.user.UserRequest;
import com.quiz.quiz.email.EmailSender;
import com.quiz.quiz.entity.Role;
import com.quiz.quiz.entity.User;
import com.quiz.quiz.repository.UserRepository;
import com.quiz.quiz.security.JwtService;
import com.quiz.quiz.token.VerificationTokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailSender emailSender;

    private final VerificationTokenService verificationTokenService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws MessagingException {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .message("User already exists")
                    .build();
        }

        var user = User
                .builder()
                .fullName(request.getUsername())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(Role.USER)
                .enabled(false)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        verificationTokenService.saveVerificationToken(jwtToken,user);
        String userToken = verificationTokenService.getToken(jwtToken);


        String link = "http://localhost:9000/api/v1/auth/validateAccount/" + userToken;
        emailSender.sendEmail(request.getEmail(),createHtmlEmail(request.getFirstName() , link) , "Confirm your email");

        return AuthenticationResponse
                .builder()
                .message("user created successfully , you need to verify account")
                .token(jwtToken)
                .refreshToke(refreshToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        verificationTokenService.revokeToken(user);
        verificationTokenService.saveVerificationToken(jwtToken,user);
        return AuthenticationResponse
                .builder()
                .message("Welcome back")
                .token(jwtToken)
                .refreshToke(refreshToken)
                .build();
    }
    public String validateUserAccount(String token){
        User user = verificationTokenService.getUser(token);
        user.setEnabled(true);
        userRepository.save(user);
        return "account confirmed";
    }


    public UserRequest validateToken(String token){
        if (jwtService.isTokenValid(token)){
            String username = jwtService.getUserName(token);
            User user = userRepository.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("user not found"));
            return new UserRequest(
                    user.getId(),
                    user.getFirstName() ,
                    user.getLastName(),
                    user.getRole().name(),
                    user.getEmail(),
                    user.getPhone()
            );
        } throw new RuntimeException("Invalid Token");
    }



    public UserRequest getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            User user =  userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
            return new UserRequest(
                    user.getId(),
                    user.getFirstName() ,
                    user.getLastName(),
                    user.getRole().name(),
                    user.getEmail(),
                    user.getPhone()
            );
        }
        throw new IllegalStateException("No authenticated user found");
    }

    public String createHtmlEmail(String name, String link) {
        return "<html>" +
                "<head>" +
                "<style type=\"text/css\">" +
                "/* Your CSS code here */" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<p>Dear " + name + ",</p>" +
                "<p>Please click on the link below to verify your account:</p>" +
                "<a href='" + link + "'>Verify Account</a>" +
                "</body>" +
                "</html>";

    }


    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String userEmail;
        final String refreshToken ;


        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.getUserName(refreshToken);

        if (userEmail != null){
            User user = userRepository.findByEmail(userEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshToken) ) {
                var accessToken = jwtService.generateToken(user);
                verificationTokenService.revokeToken(user);
                verificationTokenService.saveVerificationToken(accessToken,user);
                var authResponse = AuthenticationResponse
                        .builder()
                        .token(accessToken)
                        .refreshToke(refreshToken)
                        .build();
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);

            }
        }
    }
}
