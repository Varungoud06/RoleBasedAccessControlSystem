package org.example.notificationservce.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.notificationservce.DTO.EmailTemplateRequest;
import org.example.notificationservce.DTO.EmailTemplateResponse;
import org.example.notificationservce.services.EmailTemplateService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/email-templates")
@RequiredArgsConstructor
public class EmailTemplateController {

    private final EmailTemplateService emailTemplateService;


    @PostMapping
    public ResponseEntity<EmailTemplateResponse> createTemplate(@Valid @RequestBody EmailTemplateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(emailTemplateService.createTemplate(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailTemplateResponse> getTemplateById(@PathVariable Long id) {
        return ResponseEntity.ok(emailTemplateService.getTemplateById(id));
    }

    @GetMapping
    public ResponseEntity<List<EmailTemplateResponse>> getAllTemplates() {
        return ResponseEntity.ok(emailTemplateService.getAllTemplates());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailTemplateResponse> updateTemplate(@PathVariable Long id,
                                                                @Valid @RequestBody EmailTemplateRequest request) {
        return ResponseEntity.ok(emailTemplateService.updateTemplate(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTemplate(@PathVariable Long id) {
        emailTemplateService.deleteTemplate(id);
        return ResponseEntity.noContent().build();
    }
}
