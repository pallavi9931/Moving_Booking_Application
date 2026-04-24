package com.movie_booking_system.booking_service.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.movie_booking_system.booking_service.domain.repository.BookedSeatRepository;
import com.movie_booking_system.booking_service.domain.repository.SeatLockPort;

@Service
public class GetSeatStatusUseCase {

	private final BookedSeatRepository bookedSeatRepository;
	private final SeatLockPort seatLockPort;

	public GetSeatStatusUseCase(BookedSeatRepository bookedSeatRepository, SeatLockPort seatLockPort) {
		this.bookedSeatRepository = bookedSeatRepository;
		this.seatLockPort = seatLockPort;
	}

	public SeatStatusResult execute(Long showId) {
		List<String> booked = bookedSeatRepository.findBookedSeatNumbersByShowId(showId);
		List<String> locked = seatLockPort.findLockedSeatIds(showId);
		return new SeatStatusResult(locked, booked);
	}

}
