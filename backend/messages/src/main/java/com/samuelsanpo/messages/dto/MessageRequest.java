package com.samuelsanpo.messages.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MessageRequest {

    @NotBlank(message = "Subject is mandatory")
    @Size(max = 40, message = "Subject must not exceed 40 characters") // Requirement
    private String subject;

    @NotBlank(message = "Text content is mandatory")
    private String text;
}
