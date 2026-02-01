package com.samuelsanpo.messages.service;

import com.samuelsanpo.messages.dto.MessageRequest;
import com.samuelsanpo.messages.dto.MessageResponse;
import java.util.List;

public interface MessageService {
    List<MessageResponse> getAllMessages();
    MessageResponse getMessageById(Long id);
    MessageResponse createMessage(MessageRequest request);
    void deleteMessage(Long id);
}
