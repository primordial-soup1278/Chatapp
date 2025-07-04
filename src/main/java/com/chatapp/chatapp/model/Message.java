package com.chatapp.chatapp.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private LocalDateTime timestamp;
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Users sender;

    @ManyToOne
    @JoinColumn(name = "recipient_id")
    private Users recipient;
    public String getContent() {return content;}
    public Users getSender() {return sender;}
    public Users getRecipient() {return recipient;}
    public LocalDateTime getTimestamp() {return timestamp;}

    public void setRecipient(Users recipient) {
        this.recipient = recipient;
    }
    public void setSender(Users sender) {
        this.sender = sender;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    public void setContent(String content) {this.content = content;}
}
