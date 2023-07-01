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
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer marks;

    private String nbQuestions;

    private Integer nbAttempted = 0;
    private String image;

    private boolean active = false;
    @ManyToOne(fetch = FetchType.EAGER)
    private Topic topic;
    @OneToMany(mappedBy = "quiz" , fetch = FetchType.EAGER , cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Question> questions = new HashSet<>();

    public Integer getNbAttemptedQuiz() {
        return nbAttempted != null ? nbAttempted : 0;
    }




}
