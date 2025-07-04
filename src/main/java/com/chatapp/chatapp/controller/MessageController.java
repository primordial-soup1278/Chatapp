package com.chatapp.chatapp.controller;

import com.chatapp.chatapp.dto.MessageDto;
import com.chatapp.chatapp.model.Message;
import com.chatapp.chatapp.model.Users;
import com.chatapp.chatapp.repository.MessageRepository;
import com.chatapp.chatapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/messages")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;


    // getting messages between two users
    @GetMapping("/between/{senderId}/{recipientId}")
    public ResponseEntity<List<Message>> getMessagesBetweenUsers(@PathVariable Long senderId,
                                                                 @PathVariable Long recipientId) {
        List<Message> messages = messageRepository.findBySenderIdAndRecipientId(senderId, recipientId);
        return ResponseEntity.ok(messages);
    }

    // deleting a specific message
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        if (messageRepository.existsById(id)) {
            messageRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404
        }
    }
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody MessageDto messageDto) {
        Optional<Users> optionalSender = userRepository.findById(messageDto.getSenderId());
        Optional<Users> optionalRecipient = userRepository.findById(messageDto.getRecipientId());

        if (optionalSender.isEmpty() || optionalRecipient.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("invalid sender or receiver");
        }
        Message message = new Message();
        message.setSender(optionalSender.get());
        message.setRecipient(optionalRecipient.get());
        message.setContent(messageDto.getContent());
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
        return ResponseEntity.ok("message sent successfully");
    }
}
