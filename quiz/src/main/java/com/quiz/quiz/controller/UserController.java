package com.quiz.quiz.controller;

import com.quiz.quiz.dto.user.AuthRequest;
import com.quiz.quiz.dto.user.AuthenticationResponse;
import com.quiz.quiz.dto.user.RegisterRequest;
import com.quiz.quiz.dto.user.UserRequest;
import com.quiz.quiz.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authServices;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request) throws MessagingException {
        return ResponseEntity.ok(authServices.register(request));
    }
    @GetMapping("/validateToken/{token}")
    public ResponseEntity<UserRequest> validateToken(@PathVariable String token){
        return ResponseEntity.ok(authServices.validateToken(token));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthRequest request)
    {
        return ResponseEntity.ok(authServices.authenticate(request));
    }
    @GetMapping("/validateAccount/{token}")
    public ResponseEntity<String> confirmUserAccount(@PathVariable String token){
        return ResponseEntity.ok(authServices.validateUserAccount(token));
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserRequest> getCurrentUser() {
        return ResponseEntity.ok(authServices.getCurrentUser());
    }

    @PostMapping("/refreshToken")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        authServices.refreshToken(request,response);

    }

}
