package org.example.notificationservce.DTO;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplateResponse {

    private Long id;
    private String templateCode;
    private String templateName;
    private String channel;
    private String subject;
    private String body;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime updatedAt;
    private String updatedBy;
}
