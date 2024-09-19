package com.example.taskmanagementbackend.services.impl;

import com.example.taskmanagementbackend.models.DTO.TaskDTO;
import com.example.taskmanagementbackend.models.Project;
import com.example.taskmanagementbackend.models.Task;
import com.example.taskmanagementbackend.models.enums.TaskState;
import com.example.taskmanagementbackend.models.exceptions.ResourceNotFoundException;
import com.example.taskmanagementbackend.repositories.ProjectRepository;
import com.example.taskmanagementbackend.repositories.TaskRepository;
import com.example.taskmanagementbackend.services.ITaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {


    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;

    public TaskService(TaskRepository taskRepository, ProjectRepository projectRepository) {
        this.taskRepository = taskRepository;
        this.projectRepository = projectRepository;
    }

    // Method to get a task by ID
    public TaskDTO getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        return convertToTaskDTO(task);
    }

    // Method to get all tasks for a specific project
    public List<TaskDTO> getAllTasksByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        return project.getTasks().stream()
                .map(this::convertToTaskDTO)
                .collect(Collectors.toList());
    }

    // Method to create a new task
    public TaskDTO createTask(TaskDTO taskDTO, Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        Task task = new Task();
        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setState(taskDTO.getTaskState());
        task.setProject(project);

        Task savedTask = taskRepository.save(task);

        return convertToTaskDTO(savedTask);
    }

    // Method to update an existing task
    public TaskDTO updateTask(Long taskId, TaskDTO taskDTO) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setName(taskDTO.getName());
        task.setDescription(taskDTO.getDescription());
        task.setDueDate(taskDTO.getDueDate());
        task.setState(taskDTO.getTaskState());

        Task updatedTask = taskRepository.save(task);

        return convertToTaskDTO(updatedTask);
    }

    // Method to delete a task
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        taskRepository.delete(task);
    }

    // Helper method to convert Task to TaskDTO
    private TaskDTO convertToTaskDTO(Task task) {
        return new TaskDTO(task.getId(), task.getName(), task.getDescription(),
                task.getDueDate(), task.getState(), task.getProject().getId(), task.getProject().getName());
    }
}
