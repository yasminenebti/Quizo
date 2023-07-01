package com.quiz.quiz.repository;

import com.quiz.quiz.entity.Quiz;
import com.quiz.quiz.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz,Long> {
    @Query("""
    select q from Quiz q inner join Topic t on q.topic.id = t.id
    where t.id= :topicId
    """)
    List<Quiz> findQuizByTopic(Long topicId);


}
