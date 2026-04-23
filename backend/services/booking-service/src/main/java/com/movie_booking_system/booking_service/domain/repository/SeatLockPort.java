package com.movie_booking_system.booking_service.domain.repository;

import java.util.List;

public interface SeatLockPort {

	boolean lockSeats(Long showId, List<String> seats, String userId);

	void releaseSeats(Long showId, List<String> seats);

}
