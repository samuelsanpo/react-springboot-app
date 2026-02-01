package com.samuelsanpo.messages.controller;

import com.samuelsanpo.messages.dto.MessageRequest;
import com.samuelsanpo.messages.dto.MessageResponse;
import com.samuelsanpo.messages.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:5173") //port of React vite
public class MessageController {

    private final MessageService messageService;

    // Getting all messages
    @GetMapping
    public ResponseEntity<List<MessageResponse>> getAllMessages() {
        log.info("REST request to get all messages");
        return ResponseEntity.ok(messageService.getAllMessages());
    }

    // Get message by id
    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> getMessage(@PathVariable Long id) {
        log.info("REST request to get message : {}", id);
        return ResponseEntity.ok(messageService.getMessageById(id));
    }

    // Create message
    @PostMapping
    public ResponseEntity<MessageResponse> createMessage(@Valid @RequestBody MessageRequest request) {
        log.info("REST request to save message : {}", request.getSubject());
        MessageResponse response = messageService.createMessage(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Delete message
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        log.info("REST request to delete message : {}", id);
        messageService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }
}