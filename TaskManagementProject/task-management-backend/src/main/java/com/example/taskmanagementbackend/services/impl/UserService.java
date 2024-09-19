package com.example.taskmanagementbackend.services.impl;

import com.example.taskmanagementbackend.models.DTO.UserDTO;
import com.example.taskmanagementbackend.models.User;
import com.example.taskmanagementbackend.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {


    private final UserRepository userRepository;
//    private final PasswordEncoder passwordEncoder; // Password encoding

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to register a new user
    public UserDTO registerUser(UserDTO userDTO) {
        // Create new user and set properties
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        user.setLoggedIn(false); // Default to logged out when registering

        // Save user to the repository
        User savedUser = userRepository.save(user);

        // Return the user DTO, excluding password for security reasons
        return new UserDTO(savedUser.getId(), savedUser.getUsername(), null, savedUser.isLoggedIn());
    }

    // Method for user login
    public UserDTO loginUser(UserDTO userDTO) {
        // Find user by username
        User user = userRepository.findByUsername(userDTO.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate password
//        if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
//            throw new RuntimeException("Invalid credentials");
//        }
        if(!user.getPassword().equals(userDTO.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Mark user as logged in
        user.setLoggedIn(true);
        userRepository.save(user);

        // Return the user DTO with updated login status
        return new UserDTO(user.getId(), user.getUsername(), null, user.isLoggedIn());
    }

    // Method for logging out a user
    public void logoutUser(Long userId) {
        // Find user by ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the user is logged in
        if (!user.isLoggedIn()) {
            throw new RuntimeException("User is not logged in");
        }

        // Mark user as logged out
        user.setLoggedIn(false);
        userRepository.save(user);
    }

    // Method to get user by ID
    public UserDTO getUserById(Long id) {
        // Find user by ID
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Return user DTO
        return new UserDTO(user.getId(), user.getUsername(), null, user.isLoggedIn());
    }

    // Method to get all users
    public List<UserDTO> getAllUsers() {
        // Retrieve all users from the repository
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername(), null, user.isLoggedIn()))
                .collect(Collectors.toList());
    }

    // Method to edit a user
//    public UserDTO editUser(Long id, UserDTO userDTO) {
//        // Find user by ID
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Update user details
//        user.setUsername(userDTO.getUsername());
//        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
//            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
//        }
//
//        // Save the updated user
//        User updatedUser = userRepository.save(user);
//
//        // Return updated user DTO
//        return new UserDTO(updatedUser.getId(), updatedUser.getUsername(), null, updatedUser.isLoggedIn());
//    }

    // Method to delete a user
    public void deleteUser(Long id) {
        // Delete user by ID
        userRepository.deleteById(id);
    }

    // Other CRUD operations (getUserById, getAllUsers, etc.) remain the same
}
