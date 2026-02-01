package com.samuelsanpo.messages;

import com.samuelsanpo.messages.controller.MessageController;
import com.samuelsanpo.messages.dto.MessageRequest;
import com.samuelsanpo.messages.dto.MessageResponse;
import com.samuelsanpo.messages.service.MessageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MessagesApplicationTests {

    @Mock
    private MessageService messageService;

    @InjectMocks
    private MessageController messageController;

    @Test
    public void shouldReturnAllMessages() {
        // Arrange
        MessageResponse msg = new MessageResponse(1L, "Test Subject", "Test Content", LocalDateTime.now());
        msg.setSubject("Test Subject");
        when(messageService.getAllMessages()).thenReturn(Arrays.asList(msg));

        // Act
        ResponseEntity<List<MessageResponse>> response = messageController.getAllMessages();

        // Assert
        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("Test Subject", response.getBody().get(0).getSubject());
    }

    @Test
    public void shouldCreateNewMessage() {
        // Arrange
        MessageRequest request = new MessageRequest();
        request.setSubject("New Message");

        MessageResponse responseDto = new MessageResponse(1L, "Test Subject", "Test Content", LocalDateTime.now());
        responseDto.setSubject("New Message");

        when(messageService.createMessage(any(MessageRequest.class))).thenReturn(responseDto);

        // Act
        ResponseEntity<MessageResponse> response = messageController.createMessage(request);

        // Assert
        assertEquals(201, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("New Message", response.getBody().getSubject());
    }
}