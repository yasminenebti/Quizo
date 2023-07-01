package com.quiz.quiz.service;

import com.quiz.quiz.dto.quiz.QuizDto;
import com.quiz.quiz.entity.Quiz;
import com.quiz.quiz.entity.Topic;
import com.quiz.quiz.fileStorage.FileStorage;
import com.quiz.quiz.repository.QuizRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final FileStorage fileStorage;

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }



    public void updateQuiz(Long quizId , Quiz quiz) throws Exception {
        Optional<Quiz> quizToUpdate = quizRepository.findById(quizId);
        if (quizToUpdate.isPresent()){
            quiz.setId(quizId);
            quizRepository.save(quiz);
        }
        else throw new Exception(String.format("Quiz with ID %s not found",quizId));
    }

    public List<Quiz> getAllQuiz() {
        return quizRepository.findAll();
    }

    public List<Quiz> getAllByTopic(Long topicId){
        return quizRepository.findQuizByTopic(topicId);
    }

    public Quiz getQuiz(Long quizId) {
        return quizRepository.findById(quizId).orElseThrow();

    }

   public void attemptedQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow();
        quiz.setNbAttempted(quiz.getNbAttemptedQuiz()+1);
        quizRepository.save(quiz);
    }
    @Transactional
    public Quiz updateImage(MultipartFile file , Long quizId) throws IOException {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow();
        String imageUrl = fileStorage.uploadFile(file);

        quiz.setImage(imageUrl);
        return quizRepository.save(quiz);
    }





    public void deleteQuiz(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow();
        Topic topic = quiz.getTopic();
        if (topic != null) {
            topic.getQuizzes().remove(quiz);
        }
        quizRepository.delete(quiz);

    }
}
