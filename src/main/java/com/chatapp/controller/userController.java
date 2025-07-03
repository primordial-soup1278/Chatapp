package com.chatapp.controller;
import com.chatapp.model.User;
import com.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/users")
public class userController {
    @Autowired
    private UserRepository userRepository;

    // fetching user from some database
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        Optional<User> OptionalUser = userRepository.findById(id);
        if (OptionalUser.isPresent()) {
            User user = OptionalUser.get();
            return ResponseEntity.status(HttpStatus.OK).body(user); // 200 and user
        }
        else {
            return ResponseEntity.notFound().build(); // 401
        }

    }

    // creating a new user
    @PostMapping("/")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User saved = userRepository.save(user);
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


