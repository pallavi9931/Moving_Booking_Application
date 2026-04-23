package com.movie_booking_system.notification_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.kafka.test.context.EmbeddedKafka;

@SpringBootTest
@EmbeddedKafka(partitions = 1, topics = "booking-events")
class NotificationServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
