package org.example.notificationservce.repositories;

import org.example.notificationservce.models.EmailTemplate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailTemplateRepository extends JpaRepository<EmailTemplate, Long> {
    Optional<EmailTemplate> findByTemplateCode(String templateCode);
    boolean existsByTemplateCode(String templateCode);
}
