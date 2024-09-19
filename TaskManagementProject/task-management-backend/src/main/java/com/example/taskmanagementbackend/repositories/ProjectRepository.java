package com.example.taskmanagementbackend.repositories;

import com.example.taskmanagementbackend.models.Project;
import com.example.taskmanagementbackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}