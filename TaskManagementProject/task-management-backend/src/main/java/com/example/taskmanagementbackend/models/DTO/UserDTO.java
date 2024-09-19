package com.example.taskmanagementbackend.models.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    private boolean loggedIn;// Include in the request body, exclude in responses

    public UserDTO(Long id, String username, String password, boolean loggedIn) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.loggedIn = loggedIn;
    }
    // Constructors, getters, setters
}