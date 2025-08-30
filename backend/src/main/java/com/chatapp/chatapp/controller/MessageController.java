package com.chatapp.chatapp.controller;

import java.time.LocalDateTime;
import java.util.List;

import com.chatapp.chatapp.dto.MessageDto;
import com.chatapp.chatapp.mapper.MessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.chatapp.model.Message;
import com.chatapp.chatapp.repository.MessageRepository;
import com.chatapp.chatapp.repository.UserRepository;
import com.chatapp.chatapp.model.Users;

@RestController
@RequestMapping("/messaging/api")
public class MessageController {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("")
    public ResponseEntity<List<Message>> getAllMessages() {
       List<Message> messages = messageRepository.findAll();
       return ResponseEntity.ok().body(messages);
    }

    // setting a message as read
    @PutMapping("/{id}/read")
    public ResponseEntity<Void> markMessageAsRead(@PathVariable Long id) {
        Message message = messageRepository.findById(id).orElseThrow();
        message.setRead(true);
        message.setReadAt(LocalDateTime.now());
        messageRepository.save(message);
        return ResponseEntity.ok().build();
    }
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

    // broadcasting the message
    // in case I add chat groups in the future
    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Message sendMessage(@Payload Message message) {
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);
        return message;
    }
    @MessageMapping("/char.newUser")
    @SendTo("/topic/public")
    public Message newUser(@Payload Message message) {
        return message;
    }


    // sending a message to your friend
    @MessageMapping("/chat.private")
    public void sendPrivateMessage(@Payload Message message) {
        Users sender = userRepository.findById(message.getSender().getId()).
                orElseThrow(() -> new RuntimeException("sender not found"));
        Users recipient = userRepository.findById(message.getRecipient().getId()).
                orElseThrow(() -> new RuntimeException("recipient not found"));

        message.setSender(sender);
        message.setRecipient(recipient);
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);

        MessageDto dto = MessageMapper.toDTO(message);
        /*// delivering to recipient
        messagingTemplate.convertAndSendToUser(
                message.getRecipient().getUsername(),
                "/queue/messages",
                dto
        );*/
        // For testing: broadcast to a public topic
        messagingTemplate.convertAndSend("/topic/messages", dto);
    }
}
