package com.movie_booking_system.booking_service.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.movie_booking_system.booking_service.application.exception.SeatsNotAvailableException;
import com.movie_booking_system.booking_service.domain.repository.SeatLockPort;

@Service
public class LockSeatsUseCase {

	private final SeatLockPort seatLockPort;

	public LockSeatsUseCase(SeatLockPort seatLockPort) {
		this.seatLockPort = seatLockPort;
	}

	public void execute(Long showId, List<String> seats, String userId) {
		if (userId == null || userId.isBlank()) {
			throw new IllegalArgumentException("Missing user identity");
		}
		if (showId == null || seats == null || seats.isEmpty()) {
			throw new IllegalArgumentException("showId and seats are required");
		}
		if (!seatLockPort.lockSeats(showId, seats, userId)) {
			throw new SeatsNotAvailableException("Seats not available");
		}
	}
}
