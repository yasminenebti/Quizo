package com.quiz.quiz.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 5000)
    private String content;
    @ElementCollection
    private List<String> options;

    private String answer;
    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;
}
