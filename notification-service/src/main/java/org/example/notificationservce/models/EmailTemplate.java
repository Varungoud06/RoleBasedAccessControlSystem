package org.example.notificationservce.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "email_templates",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_email_template_code", columnNames = "template_code")
        })
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "template_code", nullable = false, length = 100)
    private String templateCode;

    @Column(name = "template_name", nullable = false, length = 150)
    private String templateName;

    @Column(name = "channel", nullable = false, length = 50)
    private String channel;

    @Column(name = "subject", nullable = false, length = 255)
    private String subject;

    @Column(name = "body", nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "created_by", nullable = false, length = 100)
    private String createdBy;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "updated_by", length = 100)
    private String updatedBy;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
