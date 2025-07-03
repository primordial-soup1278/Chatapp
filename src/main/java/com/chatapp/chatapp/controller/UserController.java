package com.chatapp.chatapp.controller;
import com.chatapp.chatapp.model.Users;
import com.chatapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/test")
    public String test() {
        return "Hello from user controller!";
    }

    @GetMapping
    public ResponseEntity<List<Users>> getAllUsers() {
        List<Users> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }
    // fetching user from some database
    @GetMapping("/{id}")
    public ResponseEntity<Users> getUser(@PathVariable Long id) {
        Optional<Users> OptionalUser = userRepository.findById(id);
        if (OptionalUser.isPresent()) {
            Users users = OptionalUser.get();
            return ResponseEntity.status(HttpStatus.OK).body(users); // 200 and user
        }
        else {
            return ResponseEntity.notFound().build(); // 401
        }

    }

    // creating a new user
    @PostMapping("/register")
    public ResponseEntity<Users> createUser(@RequestBody Users users) {
        Users saved = userRepository.save(users);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        }
        else {
           return ResponseEntity.notFound().build();
        }
    }

}


