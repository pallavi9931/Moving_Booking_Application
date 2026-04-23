package com.movie_booking_system.booking_service.interfaces.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie_booking_system.booking_service.application.usecase.BookSeatsUseCase;

@RestController
@RequestMapping("/booking")
public class BookingController {

	private final BookSeatsUseCase bookSeatsUseCase;

	public BookingController(BookSeatsUseCase bookSeatsUseCase) {
		this.bookSeatsUseCase = bookSeatsUseCase;
	}

	@PostMapping
	public ResponseEntity<String> createBooking(@RequestBody BookingRequest request) {
		bookSeatsUseCase.execute(request.getShowId(), request.getSeats(), request.getUserId());
		return ResponseEntity.ok("Booking successful");
	}

}
