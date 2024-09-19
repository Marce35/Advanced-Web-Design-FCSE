package com.example.taskmanagementbackend.dataHolder;

import com.example.taskmanagementbackend.models.Project;
import com.example.taskmanagementbackend.models.Task;
import com.example.taskmanagementbackend.models.User;
import com.example.taskmanagementbackend.models.enums.Category;
import com.example.taskmanagementbackend.models.enums.TaskState;
import com.example.taskmanagementbackend.repositories.ProjectRepository;
import com.example.taskmanagementbackend.repositories.TaskRepository;
import com.example.taskmanagementbackend.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;

@Component
public class DataHolder {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
//    private final PasswordEncoder passwordEncoder;

    public DataHolder(UserRepository userRepository, ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    @PostConstruct
    @Transactional
    public void init() {
        if (userRepository.count() == 0) {
            // Create Users
            User user1 = new User("john_doe", "password1", false);
            User user2 = new User("jane_smith", "password2", false);

            userRepository.saveAll(Arrays.asList(user1, user2));

            // Create Projects for user1
            Project project1User1 = new Project("Project 1", "Description for Project 1", Category.PROGRAMMING, user1);
            Project project2User1 = new Project("Project 2", "Description for Project 2", Category.WORKOUT, user1);
            Project project3User1 = new Project("Project 3", "Description for Project 3", Category.BASIC, user1);

            project1User1.setUser(user1);
            project2User1.setUser(user1);
            project2User1.setUser(user1);

            // Create Projects for user2
            Project project1User2 = new Project("Project A", "Description for Project A", Category.BASIC, user2);
            Project project2User2 = new Project("Project B", "Description for Project B", Category.PROGRAMMING, user2);
            Project project3User2 = new Project("Project C", "Description for Project C", Category.WORKOUT, user2);

            project1User2.setUser(user2);
            project2User2.setUser(user2);
            project3User2.setUser(user2);

            projectRepository.saveAll(Arrays.asList(project1User1, project2User1, project3User1, project1User2, project2User2, project3User2));

            // Create Tasks for project1User1
            Task task1Project1User1 = new Task("Task 1", "Task 1 description", LocalDate.now().plusDays(5), TaskState.TODO, project1User1);
            Task task2Project1User1 = new Task("Task 2", "Task 2 description", LocalDate.now().plusDays(3), TaskState.ONGOING, project1User1);

            task1Project1User1.setProject(project1User1);
            task2Project1User1.setProject(project2User1);

            // Create Tasks for project2User1
            Task task1Project2User1 = new Task("Task 1", "Task 1 description", LocalDate.now().plusDays(7), TaskState.COMPLETED, project2User1);

            task1Project2User1.setProject(project1User2);

            // Create Tasks for project1User2
            Task task1Project1User2 = new Task("Task 1", "Task 1 description", LocalDate.now().plusDays(4), TaskState.TODO, project1User2);
            Task task2Project1User2 = new Task("Task 2", "Task 2 description", LocalDate.now().plusDays(2), TaskState.ONGOING, project1User2);

            task1Project1User2.setProject(project1User2);
            task2Project1User2.setProject(project2User2);

            // Save Tasks
            taskRepository.saveAll(Arrays.asList(task1Project1User1, task2Project1User1, task1Project2User1, task1Project1User2, task2Project1User2));
        }
    }
}
