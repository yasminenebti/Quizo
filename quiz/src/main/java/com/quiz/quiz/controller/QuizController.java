package com.quiz.quiz.controller;

import com.quiz.quiz.entity.Quiz;
import com.quiz.quiz.entity.Topic;
import com.quiz.quiz.repository.QuizRepository;
import com.quiz.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/quiz")
@RequiredArgsConstructor
public class QuizController {
    private final QuizService quizService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.accepted().body(quizService.createQuiz(quiz));
    }



    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllQuiz(){
        return ResponseEntity.accepted().body(quizService.getAllQuiz());
    }

    @GetMapping("/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getQuiz(@PathVariable("quizId") Long quizId){
        return ResponseEntity.accepted().body(quizService.getQuiz(quizId));
    }

    @GetMapping("/topic/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getQuizByTopic(@PathVariable("topicId") Long topicId){
        return ResponseEntity.accepted().body(quizService.getAllByTopic(topicId));
    }

    @DeleteMapping("/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteQuiz(@PathVariable("quizId") Long quizId) {
        quizService.deleteQuiz(quizId);
    }


    @PutMapping("/{quizId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateQuiz(
            @PathVariable("quizId") Long quizId,
            @RequestBody Quiz quiz) throws Exception {
        quizService.updateQuiz(quizId,quiz);
    }
    @GetMapping("attempted/{quizId}")
    @ResponseStatus(HttpStatus.CREATED)
    public void attemptedQuiz(@PathVariable("quizId") Long quizId) {
        quizService.attemptedQuiz(quizId);
    }

    @PutMapping("image")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Quiz> updateImageQuiz(
            @RequestParam("file") MultipartFile file,
            @RequestParam("quizId") Long quizId) throws IOException {
        return ResponseEntity.accepted().body(quizService.updateImage(file,quizId));
    }


}
