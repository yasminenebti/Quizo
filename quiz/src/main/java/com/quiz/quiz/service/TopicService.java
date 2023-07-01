package com.quiz.quiz.service;

import com.quiz.quiz.entity.Topic;
import com.quiz.quiz.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TopicService {

    private final TopicRepository topicRepository;

    public Topic createTopic(Topic topic) {
        return topicRepository.save(topic);
    }
    public void updateTopic(Long topicId , Topic topic) throws Exception {
        Optional<Topic> topicToUpdate = topicRepository.findById(topicId);
        if (topicToUpdate.isPresent()){
            topic.setId(topicId);
            topicRepository.save(topic);
        }
        else throw new Exception(String.format("Topic with ID %s not found",topicId));
    }

    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    public Topic getTopic(Long topicId) {
            return topicRepository.findById(topicId).orElseThrow();

    }

    public void deleteTopic(Long topicId) {
        topicRepository.deleteById(topicId);

    }
}
