package com.samuelsanpo.messages.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
public class MessageResponse {
    private Long id;
    private String subject;
    private String text;

    @JsonFormat(pattern = "dd.MM.yyyy") // Requirement
    private LocalDateTime date;
}