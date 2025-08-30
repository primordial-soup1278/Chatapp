package com.chatapp.chatapp.mapper;

import com.chatapp.chatapp.dto.MessageDto;
import com.chatapp.chatapp.model.Message;

public class MessageMapper {
    public static MessageDto toDTO(Message message) {
        return new MessageDto(
                message.getRecipient().getId(),
                message.getContent(),
                message.getTimestamp(),
                message.getSender().getId(),
                message.getRecipient().getId(),
                message.getSender().getUsername(),
                message.getRecipient().getUsername()
        );
    }
}
