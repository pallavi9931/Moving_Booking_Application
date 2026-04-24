package com.movie_booking_system.show_service.domain.repository;

import com.movie_booking_system.show_service.domain.model.BookedAndLockedSeatIds;

public interface BookingSeatStatusPort {

	BookedAndLockedSeatIds loadByShowId(Long showId);

}
