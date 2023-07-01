package com.quiz.quiz.controller;

import com.quiz.quiz.entity.Question;
import com.quiz.quiz.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/question")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        return ResponseEntity.accepted().body(questionService.createQuestion(question));
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllQuestions(){
        return ResponseEntity.accepted().body(questionService.getAllQuestions());
    }

    @GetMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getQuestion(@PathVariable("questionId") Long questionId){
        return ResponseEntity.accepted().body(questionService.getQuestion(questionId));
    }

    @GetMapping("/quiz/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Set<Question>> getQuizQuestion(@PathVariable("quizId") Long quizId){
        return ResponseEntity.accepted().body(questionService.getQuizQuestions(quizId));
    }



    @DeleteMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteQuestion(@PathVariable("questionId") Long questionId) {
        questionService.deleteQuestion(questionId);
    }


    @PutMapping("/{questionId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateQuestion(
            @PathVariable("questionId") Long questionId,
            @RequestBody Question question) throws Exception {
        questionService.updateQuestion(questionId,question);
    }





}
