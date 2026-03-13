package org.example.notificationservce.DTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplateRequest {

    @NotBlank
    @Size(max = 100)
    private String templateCode;

    @NotBlank
    @Size(max = 150)
    private String templateName;

    @NotBlank
    @Size(max = 50)
    private String channel;

    @NotBlank
    @Size(max = 255)
    private String subject;

    @NotBlank
    private String body;

    @NotBlank
    @Size(max = 100)
    private String createdBy;

    @Size(max = 100)
    private String updatedBy;
}
