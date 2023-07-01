package com.quiz.quiz.dto.user;

public record UserRequest(
        Long id,
        String name ,
        String lastName,
        String role ,
        String email,
        Integer phone
) {
}
