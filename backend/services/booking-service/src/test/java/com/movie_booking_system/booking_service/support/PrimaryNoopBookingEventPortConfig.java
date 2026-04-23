package com.movie_booking_system.booking_service.support;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import com.movie_booking_system.booking_service.domain.repository.BookingEventPort;

@TestConfiguration
public class PrimaryNoopBookingEventPortConfig {

	@Bean
	@Primary
	public BookingEventPort noopBookingEventPort() {
		return booking -> {
		};
	}

}
