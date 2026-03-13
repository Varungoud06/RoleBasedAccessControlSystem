package org.example.notificationservce.repositories;

import org.example.notificationservce.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
