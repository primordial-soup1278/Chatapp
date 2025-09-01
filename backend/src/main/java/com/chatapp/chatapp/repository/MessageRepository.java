package com.chatapp.chatapp.repository;

import com.chatapp.chatapp.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderIdAndRecipientId(Long senderId, Long recipientId);
    List<Message> findByRecipientId(Long recipientId);

    @Query("SELECT m FROM Message m " +
           "WHERE (m.sender.id = :userId AND m.recipient.id = :friendId) " +
            " OR (m.sender.id = :friendId AND m.recipient.id = :userId) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findConversation(@Param("userId") Long userId, @Param("friendId") Long friendId);
}
