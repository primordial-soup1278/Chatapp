package com.chatapp.chatapp.dto;

import java.time.LocalDateTime;

public class MessageDto {
    // the id of the message
    private Long id;
    private String content;
    private LocalDateTime timestamp;
    private Long senderId;
    private Long recipientId;
    private String senderName;
    private String recipientName;
    public MessageDto(Long id, String content, LocalDateTime timestamp, Long senderId, Long recipientId,  String senderName, String recipientName) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.senderName = senderName;
        this.recipientName = recipientName;
    }
    public Long getId() {return id;}
    public LocalDateTime getTimestamp() {return timestamp;}
    public String getContent() {return content;}
    public Long getSenderId() {return senderId;}
    public Long getRecipientId() {return recipientId;}
    public String getSenderName() {return senderName;}
    public String getRecipientName() {return recipientName;}

    public void setId(Long id) {this.id = id;}
    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }
    public void setRecipientId(Long recipientId) {this.recipientId = recipientId;}
    public void setContent(String content) {this.content = content;}
    public void setTimestamp(LocalDateTime timestamp) {this.timestamp = timestamp;}
    public void setSenderName(String senderName) {this.senderName = senderName;}
    public void setRecipientName(String recipientName) {this.recipientName = recipientName;}
}
