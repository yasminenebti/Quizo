package com.quiz.quiz.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CloudinaryConfig {
    private final String CLOUD_NAME = "duv3sihve";
    private final String API_KEY = "919186963266696";
    private final String API_SECRET = "qUS71zgwkMoQN4Xz_DdjdyjPhns";

    @Bean
    public Cloudinary cloudinary(){
        //Map<String,String> config = new HashMap<>();
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", CLOUD_NAME,
                "api_key", API_KEY,
                "api_secret", API_SECRET));
    }
}
