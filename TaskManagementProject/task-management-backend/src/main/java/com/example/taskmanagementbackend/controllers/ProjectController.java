package com.example.taskmanagementbackend.controllers;

import com.example.taskmanagementbackend.models.DTO.ProjectDTO;
import com.example.taskmanagementbackend.models.Project;
import com.example.taskmanagementbackend.services.impl.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    // Endpoint to get all projects for the logged-in user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ProjectDTO>> getAllProjectsForUser(@PathVariable Long userId) {
        List<ProjectDTO> projects = projectService.getAllProjectsForUser(userId);
        return ResponseEntity.ok(projects);
    }

    // Endpoint to get a single project by ID along with tasks
    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long projectId) {
        ProjectDTO projectDTO = projectService.getProjectById(projectId);
        return ResponseEntity.ok(projectDTO);
    }

    // Endpoint to create a new project for the logged-in user
    @PostMapping("/create/{userId}")
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO, @PathVariable Long userId) {
        ProjectDTO createdProject = projectService.createProject(projectDTO, userId);
        return ResponseEntity.ok(createdProject);
    }

    // Endpoint to edit an existing project
    @PutMapping("/{projectId}/edit")
    public ResponseEntity<ProjectDTO> editProject(@PathVariable Long projectId, @RequestBody ProjectDTO projectDTO) {
        ProjectDTO updatedProject = projectService.editProject(projectId, projectDTO);
        return ResponseEntity.ok(updatedProject);
    }

    // Endpoint to delete a project and associated tasks
    @DeleteMapping("/{projectId}/delete")
    public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
        projectService.deleteProject(projectId);
        return ResponseEntity.ok().build();
    }
}
