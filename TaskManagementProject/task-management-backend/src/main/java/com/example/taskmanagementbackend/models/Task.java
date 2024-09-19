package com.example.taskmanagementbackend.models;

import com.example.taskmanagementbackend.models.enums.TaskState;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
    private String description;
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskState state;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Task(String name, String description, LocalDate dueDate, TaskState state, Project project) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.state = state;
    }

    // Getters and setters
}