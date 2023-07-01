package com.quiz.quiz.security;

import com.quiz.quiz.token.VerificationRepo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private final VerificationRepo verificationRepo;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
    {
        final String authHeader = request.getHeader("Authorization");
        final String token ;

        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return;
        }
        token = authHeader.substring(7);
        var storedToken = verificationRepo.findByToken(token).orElseThrow();
        storedToken.setExpired(true);
        storedToken.setRevoked(true);
        verificationRepo.save(storedToken);

    }
}
