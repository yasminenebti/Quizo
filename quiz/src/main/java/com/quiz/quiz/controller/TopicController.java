package com.quiz.quiz.controller;

import com.quiz.quiz.entity.Topic;
import com.quiz.quiz.service.TopicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/topic")
@RequiredArgsConstructor
public class TopicController {

    private final TopicService topicService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) {
        return ResponseEntity.accepted().body(topicService.createTopic(topic));
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getAllTopics(){
        return ResponseEntity.accepted().body(topicService.getTopics());
    }

    @GetMapping("/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getTopic(@PathVariable("topicId") Long topicId){
        return ResponseEntity.accepted().body(topicService.getTopic(topicId));
    }

    @DeleteMapping("/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteTopic(@PathVariable("topicId") Long topicId) {
        topicService.deleteTopic(topicId);
    }


    @PutMapping("/{topicId}")
    @ResponseStatus(HttpStatus.OK)
    public void updateTopic(
            @PathVariable("topicId") Long topicId,
            @RequestBody Topic topic) throws Exception {
        topicService.updateTopic(topicId,topic);
    }



}
