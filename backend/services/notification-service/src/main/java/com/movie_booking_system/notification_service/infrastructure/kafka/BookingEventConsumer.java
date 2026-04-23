package com.movie_booking_system.notification_service.infrastructure.kafka;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class BookingEventConsumer {

	@KafkaListener(topics = "booking-events", groupId = "notification-group")
	public void consume(String message) {
		System.out.println("Received Event: " + message);
		System.out.println("Email sent successfully");
	}

}
