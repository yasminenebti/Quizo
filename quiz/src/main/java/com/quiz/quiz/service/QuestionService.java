package com.quiz.quiz.service;

import com.quiz.quiz.entity.Question;
import com.quiz.quiz.entity.Quiz;
import com.quiz.quiz.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuizService quizService;

    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }
    public void updateQuestion(Long questionId , Question question) throws Exception {
        Optional<Question> questionToUpdate = questionRepository.findById(questionId);
        if (questionToUpdate.isPresent()){
            question.setId(questionId);
            questionRepository.save(question);
        }
        else throw new Exception(String.format("Question with ID %s not found",questionId));
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public Question getQuestion(Long questionId) {
        return questionRepository.findById(questionId).orElseThrow();

    }


    public Set<Question> getQuizQuestions(Long quizId) {
        Quiz quiz = quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();

        List<Question> shuffledQuestions = new ArrayList<>(questions);
        Collections.shuffle(shuffledQuestions);

        return new LinkedHashSet<>(shuffledQuestions);
    }



    public void deleteQuestion(Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();
        Quiz quiz = question.getQuiz();
        if (quiz!= null) {
            quiz.getQuestions().remove(question);
        }
        questionRepository.delete(question);
    }


}
