package com.movie_booking_system.booking_service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

import com.movie_booking_system.booking_service.support.PrimaryNoopBookingEventPortConfig;

@SpringBootTest
@Import(PrimaryNoopBookingEventPortConfig.class)
class BookingServiceApplicationTests {

	@Test
	void contextLoads() {
	}

}
