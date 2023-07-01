package com.quiz.quiz.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;
    @OneToMany(mappedBy = "topic" , fetch = FetchType.EAGER , cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonIgnore
    private Set<Quiz> quizzes = new HashSet<>();
}
