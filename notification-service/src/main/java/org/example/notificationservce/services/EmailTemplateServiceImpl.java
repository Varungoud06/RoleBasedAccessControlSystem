package org.example.notificationservce.services;

import lombok.RequiredArgsConstructor;
import org.example.notificationservce.DTO.EmailTemplateRequest;
import org.example.notificationservce.DTO.EmailTemplateResponse;
import org.example.notificationservce.exceptions.ResourceNotFoundException;
import org.example.notificationservce.models.EmailTemplate;
import org.example.notificationservce.repositories.EmailTemplateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailTemplateServiceImpl implements EmailTemplateService {

    private final EmailTemplateRepository emailTemplateRepository;

    @Override
    public EmailTemplateResponse createTemplate(EmailTemplateRequest request) {
        if (emailTemplateRepository.existsByTemplateCode(request.getTemplateCode())) {
            throw new IllegalArgumentException("Template code already exists: " + request.getTemplateCode());
        }

        EmailTemplate template = EmailTemplate.builder()
                .templateCode(request.getTemplateCode())
                .templateName(request.getTemplateName())
                .channel(request.getChannel())
                .subject(request.getSubject())
                .body(request.getBody())
                .createdBy(request.getCreatedBy())
                .updatedBy(request.getUpdatedBy())
                .build();

        return mapToResponse(emailTemplateRepository.save(template));
    }

    @Override
    public EmailTemplateResponse getTemplateById(Long id) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Email template not found with id: " + id));

        return mapToResponse(template);
    }

    @Override
    public List<EmailTemplateResponse> getAllTemplates() {
        return emailTemplateRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public EmailTemplateResponse updateTemplate(Long id, EmailTemplateRequest request) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Email template not found with id: " + id));

        if (!template.getTemplateCode().equals(request.getTemplateCode())
                && emailTemplateRepository.existsByTemplateCode(request.getTemplateCode())) {
            throw new IllegalArgumentException("Template code already exists: " + request.getTemplateCode());
        }

        template.setTemplateCode(request.getTemplateCode());
        template.setTemplateName(request.getTemplateName());
        template.setChannel(request.getChannel());
        template.setSubject(request.getSubject());
        template.setBody(request.getBody());
        template.setUpdatedBy(request.getUpdatedBy());

        EmailTemplate updated = emailTemplateRepository.save(template);
        return mapToResponse(updated);
    }

    @Override
    public void deleteTemplate(Long id) {
        EmailTemplate template = emailTemplateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Email template not found with id: " + id));

        emailTemplateRepository.delete(template);
    }

    private EmailTemplateResponse mapToResponse(EmailTemplate template) {
        return EmailTemplateResponse.builder()
                .id(template.getId())
                .templateCode(template.getTemplateCode())
                .templateName(template.getTemplateName())
                .channel(template.getChannel())
                .subject(template.getSubject())
                .body(template.getBody())
                .createdAt(template.getCreatedAt())
                .createdBy(template.getCreatedBy())
                .updatedAt(template.getUpdatedAt())
                .updatedBy(template.getUpdatedBy())
                .build();
    }
}
