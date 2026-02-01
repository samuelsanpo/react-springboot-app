package com.samuelsanpo.messages.service;

import com.samuelsanpo.messages.dto.MessageRequest;
import com.samuelsanpo.messages.dto.MessageResponse;
import com.samuelsanpo.messages.exception.ResourceNotFoundException;
import com.samuelsanpo.messages.model.Message;
import com.samuelsanpo.messages.repository.MessageRepository;
import com.samuelsanpo.messages.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Override
    @Transactional(readOnly = true)
    public List<MessageResponse> getAllMessages() {
        log.info("Fetching all messages from the database");
        return messageRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MessageResponse getMessageById(Long id) {
        log.info("Fetching message details for ID: {}", id);
        return messageRepository.findById(id)
                .map(this::mapToResponse)
                .orElseThrow(() -> {
                    log.error("Message with ID {} not found", id);
                    return new ResourceNotFoundException("Message not found with id: " + id);
                });
    }

    @Override
    @Transactional
    public MessageResponse createMessage(MessageRequest request) {
        log.info("Creating new message with subject: {}", request.getSubject());

        Message message = new Message();
        message.setSubject(request.getSubject());
        message.setText(request.getText());

        // The createdAt field is filled automatically.
        Message savedMessage = messageRepository.save(message);

        log.info("Message created successfully with ID: {}", savedMessage.getId());
        return mapToResponse(savedMessage);
    }

    @Override
    @Transactional
    public void deleteMessage(Long id) {
        log.warn("Attempting to delete message with ID: {}", id);
        if (!messageRepository.existsById(id)) {
            log.error("Delete failed: Message with ID {} does not exist", id);
            throw new ResourceNotFoundException("Cannot delete: Message not found with id: " + id);
        }
        messageRepository.deleteById(id);
        log.info("Message with ID {} deleted successfully", id);
    }

    // Mapping the identity of the DB to the DTO for the API
    private MessageResponse mapToResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .subject(message.getSubject())
                .text(message.getText())
                .date(message.getCreatedAt())
                .build();
    }
}