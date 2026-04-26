package com.movie_booking_system.booking_service.interfaces.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie_booking_system.booking_service.application.usecase.ConfirmBookingUseCase;
import com.movie_booking_system.booking_service.application.usecase.LockSeatsUseCase;

@RestController
@RequestMapping("/booking")
public class BookingController {

	private final LockSeatsUseCase lockSeatsUseCase;

	private final ConfirmBookingUseCase confirmBookingUseCase;

	public BookingController(LockSeatsUseCase lockSeatsUseCase, ConfirmBookingUseCase confirmBookingUseCase) {
		this.lockSeatsUseCase = lockSeatsUseCase;
		this.confirmBookingUseCase = confirmBookingUseCase;
	}

	@PostMapping
	public ResponseEntity<Map<String, Object>> lockSeats(
			@RequestBody BookingRequest request,
			@RequestHeader(value = "X-User", required = false) String userId) {
		requireUser(userId);
		lockSeatsUseCase.execute(request.getShowId(), request.getSeats(), userId);
		return ResponseEntity.ok(Map.of("success", true));
	}

	@PostMapping("/confirm")
	public ResponseEntity<Map<String, Object>> confirmBooking(
			@RequestBody BookingRequest request,
			@RequestHeader(value = "X-User", required = false) String userId) {
		requireUser(userId);
		confirmBookingUseCase.execute(request.getShowId(), request.getSeats(), userId);
		return ResponseEntity.ok(Map.of("success", true));
	}

	private static void requireUser(String userId) {
		if (userId == null || userId.isBlank()) {
			throw new IllegalArgumentException("X-User header is required");
		}
	}
}
