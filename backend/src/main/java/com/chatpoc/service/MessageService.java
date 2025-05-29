package com.chatpoc.service;

import com.chatpoc.model.Message;
import com.chatpoc.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    public List<Message> getAllMessages() {
        return messageRepository.findAllByOrderByTimestampAsc();
    }
    
    public Message createMessage(String sender, String content) {
        Message message = new Message(sender, content);
        Message savedMessage = messageRepository.save(message);
        
        // Diffuser le message via WebSocket
        messagingTemplate.convertAndSend("/topic/messages", savedMessage);
        
        return savedMessage;
    }
}
