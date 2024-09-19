package com.example.taskmanagementbackend.services.impl;

import com.example.taskmanagementbackend.models.DTO.ProjectDTO;
import com.example.taskmanagementbackend.models.DTO.TaskDTO;
import com.example.taskmanagementbackend.models.Project;
import com.example.taskmanagementbackend.models.User;
import com.example.taskmanagementbackend.repositories.ProjectRepository;
import com.example.taskmanagementbackend.repositories.TaskRepository;
import com.example.taskmanagementbackend.repositories.UserRepository;
import com.example.taskmanagementbackend.services.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, TaskRepository taskRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // Method to get all projects for the logged-in user
    public List<ProjectDTO> getAllProjectsForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find projects by user
        return projectRepository.findByUser(user).stream()
                .map(this::convertToProjectDTO)
                .collect(Collectors.toList());
    }

    // Method to get a single project by ID along with tasks
    public ProjectDTO getProjectById(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Convert the project and tasks to DTO
        return convertToProjectDTO(project);
    }

    // Method to create a new project
    public ProjectDTO createProject(ProjectDTO projectDTO, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project project = new Project();
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setCategory(projectDTO.getCategory());
        project.setUser(user);

        // Save project
        Project savedProject = projectRepository.save(project);

        return convertToProjectDTO(savedProject);
    }

    // Method to edit an existing project
    public ProjectDTO editProject(Long projectId, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Update project fields
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setCategory(projectDTO.getCategory());

        // Save updated project
        Project updatedProject = projectRepository.save(project);

        return convertToProjectDTO(updatedProject);
    }

    // Method to delete a project and associated tasks
    public void deleteProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Delete associated tasks
//        taskRepository.deleteByProject(project);

        // Delete the project
        projectRepository.delete(project);
    }

    // Helper method to convert Project to ProjectDTO
    private ProjectDTO convertToProjectDTO(Project project) {
        List<TaskDTO> taskDTOs = project.getTasks().stream()
                .map(task -> new TaskDTO(task.getId(), task.getName(), task.getDescription(),
                        task.getDueDate(), task.getState(), project.getId(), project.getName()))
                .collect(Collectors.toList());

        return new ProjectDTO(project.getId(), project.getName(), project.getDescription(),
                project.getCategory(), project.getUser().getId(), taskDTOs);
    }
}

