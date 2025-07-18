package com.chatapp.chatapp.controller;
import java.util.List;
import java.util.Optional;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.chatapp.model.Users;
import com.chatapp.chatapp.repository.UserRepository;

import javax.swing.text.html.Option;

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
        System.out.println("register");
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

    @GetMapping("/by-id/{id}/friends")
    public ResponseEntity<List<Long>> getUserFriendsId(@PathVariable Long id) {
        Optional<Users> optionalUser = userRepository.findById(id);
        
        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();
            return ResponseEntity.ok(user.getFriends());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/by-username/{username}/friends")
    public ResponseEntity<List<Long>> getUserFriendsUsername(@PathVariable String username) {
        Optional<Users> optionalUser = userRepository.findByUsername(username);
        if(optionalUser.isPresent()) {
            Users user = optionalUser.get();
            return ResponseEntity.ok(user.getFriends());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/by-username/{username}/friends/{friendName}")
    public ResponseEntity<String> addFriendUsername(@PathVariable String username, @PathVariable String friendName) {
        System.out.println("adding friend...");
        Optional<Users> optionalUser = userRepository.findByUsername(username);
        Optional<Users> optionalFriend = userRepository.findByUsername(friendName);
        if (!optionalUser.isPresent()) {
            System.out.println("user not found");
            return ResponseEntity.notFound().build();
        }
        if(!optionalFriend.isPresent()) {
            System.out.println("Friend not found");
            return ResponseEntity.notFound().build();
        }

        Users user = optionalUser.get();
        Users friend = optionalFriend.get();

        if(user.getUsername().equals(friend.getUsername())) {
            System.out.println("cannot add yourself");
            return ResponseEntity.badRequest().body("cannot add yourself");
        }
        if(user.isFriendWith(friend)) {
            System.out.println("already friends");
            return ResponseEntity.badRequest().body("Already friends");
        }
        System.out.println("Success?");
        user.addFriend(friend);
        userRepository.save(user);
        userRepository.save(friend);
        return ResponseEntity.ok("Friend added successfully");
    }
    @PostMapping("/{userId}/friends/{friendId}")
    public ResponseEntity<String> addFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        Optional<Users> optionalUser = userRepository.findById(userId);
        Optional<Users> optionalFriend = userRepository.findById(friendId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        if (!optionalFriend.isPresent()) {
            return ResponseEntity.badRequest().body("Friend user not found");
        }

        Users user = optionalUser.get();
        Users friend = optionalFriend.get();

        if(userId.equals(friendId)) {
            return ResponseEntity.badRequest().body("cannot add yourself");
        }
        if(user.isFriendWith(friend)) {
            return ResponseEntity.badRequest().body("Already friends");
        }

        user.addFriend(friend);
        userRepository.save(user);
        userRepository.save(friend);

        return ResponseEntity.ok("Friend added successfully");
    }

    @DeleteMapping("/{userId}/friends/{friendId}")
    public ResponseEntity<String> removeFriend(@PathVariable Long userId, @PathVariable Long friendId) {
        Optional<Users> optionalUser = userRepository.findById(userId);
        Optional<Users> optionalFriend = userRepository.findById(friendId);

        if (!optionalUser.isPresent()) {
            ResponseEntity.notFound().build();
        }
        if (!optionalFriend.isPresent()) {
            ResponseEntity.badRequest().body("Friend user not found");
        }

        Users user = optionalUser.get();
        Users friend = optionalFriend.get();

        if (!user.isFriendWith(friend)) {
            return ResponseEntity.badRequest().body("Not friends");
        }

        user.removeFriend(friend);
        userRepository.save(user);
        userRepository.save(friend);

        return ResponseEntity.ok("Friend removed successfully");
    }

}


