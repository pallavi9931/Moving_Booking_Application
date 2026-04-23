package com.movie_booking_system.show_service.domain.repository;

import com.movie_booking_system.show_service.domain.model.Seat;
import java.util.List;

public interface SeatRepository {

	List<Seat> findByShowId(Long showId);

	Seat save(Seat seat);
}
