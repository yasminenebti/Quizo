package com.quiz.quiz.token;

import com.quiz.quiz.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class VerificationToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    private LocalDateTime createdAt;

    private boolean expired;
    private boolean revoked;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

}
