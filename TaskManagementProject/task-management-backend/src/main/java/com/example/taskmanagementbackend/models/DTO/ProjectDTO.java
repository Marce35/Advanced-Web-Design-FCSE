package com.example.taskmanagementbackend.models.DTO;

import com.example.taskmanagementbackend.models.enums.Category;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private Category category;
    private Long userId;
    private List<TaskDTO> tasks; // Include associated tasks

    // Constructors, getters, setters
    public ProjectDTO(Long id, String name, String description, Category category, Long userId, List<TaskDTO> tasks) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.userId = userId;
        this.tasks = tasks;
    }

    // Getters and setters
}