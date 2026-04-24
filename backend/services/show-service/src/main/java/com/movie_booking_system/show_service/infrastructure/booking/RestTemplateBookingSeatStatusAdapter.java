package com.movie_booking_system.show_service.infrastructure.booking;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.movie_booking_system.show_service.domain.model.BookedAndLockedSeatIds;
import com.movie_booking_system.show_service.domain.repository.BookingSeatStatusPort;

@Component
public class RestTemplateBookingSeatStatusAdapter implements BookingSeatStatusPort {

	private final RestTemplate restTemplate;
	private final String bookingServiceBaseUrl;

	public RestTemplateBookingSeatStatusAdapter(
			RestTemplate restTemplate,
			@Value("${booking-service.base-url}") String bookingServiceBaseUrl) {
		this.restTemplate = restTemplate;
		this.bookingServiceBaseUrl = bookingServiceBaseUrl;
	}

	@Override
	public BookedAndLockedSeatIds loadByShowId(Long showId) {
		String uri = UriComponentsBuilder.fromUriString(bookingServiceBaseUrl)
				.path("/booking/seats/status")
				.queryParam("showId", showId)
				.toUriString();
		ResponseEntity<BookingSeatStatusJson> response = restTemplate.getForEntity(uri, BookingSeatStatusJson.class);
		BookingSeatStatusJson body = response.getBody();
		if (body == null) {
			return new BookedAndLockedSeatIds(Collections.emptyList(), Collections.emptyList());
		}
		List<String> booked = body.getBooked() != null ? body.getBooked() : Collections.emptyList();
		List<String> locked = body.getLocked() != null ? body.getLocked() : Collections.emptyList();
		return new BookedAndLockedSeatIds(booked, locked);
	}

}
