package com.movie_booking_system.show_service.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movie_booking_system.show_service.application.exception.ShowNotFoundException;
import com.movie_booking_system.show_service.domain.model.BookedAndLockedSeatIds;
import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.domain.repository.BookingSeatStatusPort;
import com.movie_booking_system.show_service.domain.repository.SeatRepository;
import com.movie_booking_system.show_service.domain.repository.ShowRepository;

@Service
public class GetSeatsUseCase {

	private static final String STATUS_BOOKED = "BOOKED";
	private static final String STATUS_LOCKED = "LOCKED";
	private static final String STATUS_AVAILABLE = "AVAILABLE";

	private final ShowRepository showRepository;
	private final SeatRepository seatRepository;
	private final BookingSeatStatusPort bookingSeatStatusPort;

	public GetSeatsUseCase(
			ShowRepository showRepository,
			SeatRepository seatRepository,
			BookingSeatStatusPort bookingSeatStatusPort) {
		this.showRepository = showRepository;
		this.seatRepository = seatRepository;
		this.bookingSeatStatusPort = bookingSeatStatusPort;
	}

	@Transactional(readOnly = true)
	public List<Seat> execute(Long showId) {
		if (showRepository.findById(showId).isEmpty()) {
			throw new ShowNotFoundException(showId);
		}
		List<Seat> seats = seatRepository.findByShowId(showId);
		BookedAndLockedSeatIds bookingState = bookingSeatStatusPort.loadByShowId(showId);
		for (Seat seat : seats) {
			String seatNumber = seat.getSeatNumber();
			if (bookingState.getBooked().contains(seatNumber)) {
				seat.setStatus(STATUS_BOOKED);
			}
			else if (bookingState.getLocked().contains(seatNumber)) {
				seat.setStatus(STATUS_LOCKED);
			}
			else {
				seat.setStatus(STATUS_AVAILABLE);
			}
		}
		return seats;
	}
}
