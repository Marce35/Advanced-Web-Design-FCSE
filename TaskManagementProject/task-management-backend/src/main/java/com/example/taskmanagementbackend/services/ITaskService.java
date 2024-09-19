package com.example.taskmanagementbackend.services;

import com.example.taskmanagementbackend.models.Task;
import com.example.taskmanagementbackend.models.enums.TaskState;

import java.util.List;

public interface ITaskService {
    List<Task> getTasksByProject(Long projectId);
    Task createTask(Task task);
    Task updateTaskState(Long taskId, TaskState newState);
}
