package com.chatapp.chatapp.dto;

import java.sql.Timestamp;

public class MessageDto {
    private String content;
    private Timestamp timestamp;
    private Long senderId;
    private Long recipientId;

    public Timestamp getTimestamp() {return timestamp;}
    public String getContent() {return content;}
    public Long getSenderId() {return senderId;}
    public Long getRecipientId() {return recipientId;}

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }
    public void setRecipientId(Long recipientId) {this.recipientId = recipientId;}
    public void setContent(String content) {this.content = content;}
    public void setTimestamp(Timestamp timestamp) {this.timestamp = timestamp;}
}
