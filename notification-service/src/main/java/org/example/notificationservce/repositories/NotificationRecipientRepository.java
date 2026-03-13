package org.example.notificationservce.repositories;

import org.example.notificationservce.models.NotificationRecipient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRecipientRepository extends JpaRepository<NotificationRecipient, Long> {
}
