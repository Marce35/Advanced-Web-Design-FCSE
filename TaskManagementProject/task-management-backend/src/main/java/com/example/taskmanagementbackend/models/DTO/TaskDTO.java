package com.example.taskmanagementbackend.models.DTO;

import com.example.taskmanagementbackend.models.enums.TaskState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDate dueDate;
    private TaskState taskState;
    private Long projectId;
    private String projectName;

    // Constructors, getters, setters
    public TaskDTO(Long id, String name, String description, LocalDate dueDate, TaskState taskState, Long projectId, String projectName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.taskState = taskState;
        this.projectId = projectId;
        this.projectName = projectName;
    }

    // Getters and setters
}
