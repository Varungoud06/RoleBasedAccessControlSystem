package org.example.notificationservce.services;


import org.example.notificationservce.DTO.EmailTemplateRequest;
import org.example.notificationservce.DTO.EmailTemplateResponse;

import java.util.List;

public interface EmailTemplateService {
    EmailTemplateResponse createTemplate(EmailTemplateRequest request);
    EmailTemplateResponse getTemplateById(Long id);
    List<EmailTemplateResponse> getAllTemplates();
    EmailTemplateResponse updateTemplate(Long id, EmailTemplateRequest request);
    void deleteTemplate(Long id);
}
