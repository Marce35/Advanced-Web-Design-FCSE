package com.example.taskmanagementbackend.services;

import com.example.taskmanagementbackend.models.Project;

import java.util.List;

public interface IProjectService {
     List<Project> getAllProjects();
     Project createProject(Project project);
}
