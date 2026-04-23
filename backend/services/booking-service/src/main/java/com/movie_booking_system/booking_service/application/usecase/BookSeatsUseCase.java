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
public class BookSeatsUseCase {

	private final SeatLockPort seatLockPort;
	private final BookingRepository bookingRepository;
	private final BookingEventPort bookingEventPort;

	public BookSeatsUseCase(
			SeatLockPort seatLockPort,
			BookingRepository bookingRepository,
			BookingEventPort bookingEventPort) {
		this.seatLockPort = seatLockPort;
		this.bookingRepository = bookingRepository;
		this.bookingEventPort = bookingEventPort;
	}

	public void execute(Long showId, List<String> seats, String userId) {
		if (!seatLockPort.lockSeats(showId, seats, userId)) {
			throw new SeatsNotAvailableException("Seats not available");
		}
		try {
			Booking booking = new Booking(null, showId, new ArrayList<>(seats), userId);
			Booking saved = bookingRepository.save(booking);
			bookingEventPort.publishBookingConfirmed(saved);
		}
		catch (RuntimeException ex) {
			seatLockPort.releaseSeats(showId, seats);
			throw ex;
		}
	}

}
