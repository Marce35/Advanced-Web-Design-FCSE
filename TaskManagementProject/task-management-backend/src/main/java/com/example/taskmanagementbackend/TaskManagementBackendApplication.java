package com.example.taskmanagementbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class TaskManagementBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskManagementBackendApplication.class, args);
    }
//
//    @Bean
//    PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(10);
//    }
}
