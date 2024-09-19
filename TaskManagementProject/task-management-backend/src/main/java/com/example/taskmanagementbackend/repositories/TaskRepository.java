package com.example.taskmanagementbackend.repositories;

import com.example.taskmanagementbackend.models.Project;
import com.example.taskmanagementbackend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    void deleteByProject(Project project);
}
