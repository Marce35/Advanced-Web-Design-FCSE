package com.example.taskmanagementbackend.controllers;

import com.example.taskmanagementbackend.models.DTO.TaskDTO;
import com.example.taskmanagementbackend.models.Task;
import com.example.taskmanagementbackend.models.enums.TaskState;
import com.example.taskmanagementbackend.services.impl.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("api/tasks")
public class TaskController {


    private final TaskService taskService;
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Endpoint to get a task by ID
    @GetMapping("/{taskId}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long taskId) {
        TaskDTO taskDTO = taskService.getTaskById(taskId);
        return ResponseEntity.ok(taskDTO);
    }

    // Endpoint to get all tasks by project ID
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskDTO>> getAllTasksByProject(@PathVariable Long projectId) {
        List<TaskDTO> tasks = taskService.getAllTasksByProject(projectId);
        return ResponseEntity.ok(tasks);
    }

    // Endpoint to create a new task
    @PostMapping("/project/{projectId}")
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO, @PathVariable Long projectId) {
        TaskDTO createdTask = taskService.createTask(taskDTO, projectId);
        return ResponseEntity.ok(createdTask);
    }

    // Endpoint to update an existing task
    @PutMapping("/{taskId}/edit")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long taskId, @RequestBody TaskDTO taskDTO) {
        TaskDTO updatedTask = taskService.updateTask(taskId, taskDTO);
        return ResponseEntity.ok(updatedTask);
    }

    // Endpoint to delete a task
    @DeleteMapping("/{taskId}/delete")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok().build();
    }
}