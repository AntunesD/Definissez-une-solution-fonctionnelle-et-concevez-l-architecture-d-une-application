package com.chatpoc.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequest {
    @NotBlank(message = "Le sender est requis")
    @Pattern(regexp = "client|agent", message = "Le sender doit être 'client' ou 'agent'")
    private String sender;

    @NotBlank(message = "Le contenu est requis")
    private String content;
}
