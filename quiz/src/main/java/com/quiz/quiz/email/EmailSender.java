package com.quiz.quiz.email;
import jakarta.mail.MessagingException;


public interface EmailSender {
    void sendEmail(String receiver,
                   String email,
                    String subject) throws MessagingException;
}
