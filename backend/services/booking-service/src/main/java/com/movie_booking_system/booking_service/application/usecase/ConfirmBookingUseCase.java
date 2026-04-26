package com.movie_booking_system.booking_service.application.usecase;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.movie_booking_system.booking_service.application.exception.SeatsNotAvailableException;
import com.movie_booking_system.booking_service.domain.model.Booking;
import com.movie_booking_system.booking_service.domain.repository.BookingEventPort;
import com.movie_booking_system.booking_service.domain.repository.BookingRepository;
import com.movie_booking_system.booking_service.domain.repository.SeatLockPort;

@Service
public class ConfirmBookingUseCase {

	private final SeatLockPort seatLockPort;
	private final BookingRepository bookingRepository;
	private final BookingEventPort bookingEventPort;

	public ConfirmBookingUseCase(
			SeatLockPort seatLockPort,
			BookingRepository bookingRepository,
			BookingEventPort bookingEventPort) {
		this.seatLockPort = seatLockPort;
		this.bookingRepository = bookingRepository;
		this.bookingEventPort = bookingEventPort;
	}

	public void execute(Long showId, List<String> seats, String userId) {
		if (userId == null || userId.isBlank()) {
			throw new IllegalArgumentException("Missing user identity");
		}
		if (showId == null || seats == null || seats.isEmpty()) {
			throw new IllegalArgumentException("showId and seats are required");
		}
		for (String seatId : seats) {
			if (!seatLockPort.getLockOwner(showId, seatId).filter(userId::equals).isPresent()) {
				throw new SeatsNotAvailableException("Seat not locked by this user: " + seatId);
			}
		}
		Booking booking = new Booking(null, showId, new ArrayList<>(seats), userId);
		Booking saved = bookingRepository.save(booking);
		bookingEventPort.publishBookingConfirmed(saved);
		seatLockPort.releaseSeats(showId, seats);
	}
}
