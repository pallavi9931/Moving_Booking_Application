package com.movie_booking_system.booking_service.infrastructure.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.movie_booking_system.booking_service.domain.model.Booking;
import com.movie_booking_system.booking_service.domain.repository.BookingEventPort;

@Component
public class KafkaBookingProducer implements BookingEventPort {

	private static final String TOPIC_BOOKING_EVENTS = "booking-events";

	private final KafkaTemplate<String, String> kafkaTemplate;

	public KafkaBookingProducer(KafkaTemplate<String, String> kafkaTemplate) {
		this.kafkaTemplate = kafkaTemplate;
	}

	@Override
	public void publishBookingConfirmed(Booking booking) {
		String payload = buildBookingConfirmedJson(booking);
		kafkaTemplate.send(TOPIC_BOOKING_EVENTS, payload);
	}

	private static String buildBookingConfirmedJson(Booking booking) {
		String userId = booking.getUserId() == null ? "" : escapeJsonString(booking.getUserId());
		Long bookingId = booking.getId();
		return "{\"eventType\":\"BOOKING_CONFIRMED\",\"bookingId\":" + bookingId + ",\"userId\":\"" + userId + "\"}";
	}

	private static String escapeJsonString(String value) {
		return value.replace("\\", "\\\\").replace("\"", "\\\"");
	}

}
