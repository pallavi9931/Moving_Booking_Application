package com.movie_booking_system.booking_service.domain.repository;

import java.util.List;

public interface SeatLockPort {

	boolean lockSeats(Long showId, List<String> seats, String userId);

	void releaseSeats(Long showId, List<String> seats);

	/**
	 * Returns seat identifiers that currently hold a Redis lock for the given show.
	 * Keys follow {@code lock:{showId}:{seatId}}.
	 */
	List<String> findLockedSeatIds(Long showId);

}
