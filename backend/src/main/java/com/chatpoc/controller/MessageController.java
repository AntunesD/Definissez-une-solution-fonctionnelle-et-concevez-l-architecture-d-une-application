package com.chatpoc.controller;

import com.chatpoc.dto.ApiResponse;
import com.chatpoc.dto.MessageRequest;
import com.chatpoc.model.Message;
import com.chatpoc.service.MessageService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "${spring.web.cors.allowed-origins}")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Message>>> getAllMessages() {
        try {
            List<Message> messages = messageService.getAllMessages();
            return ResponseEntity.ok(ApiResponse.success(messages));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Erreur lors de la récupération des messages"));
        }
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Message>> createMessage(@Valid @RequestBody MessageRequest request) {
        try {
            Message message = messageService.createMessage(request.getSender(), request.getContent());
            return ResponseEntity.ok(ApiResponse.success(message));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(ApiResponse.error("Erreur lors de la création du message"));
        }
    }
}
