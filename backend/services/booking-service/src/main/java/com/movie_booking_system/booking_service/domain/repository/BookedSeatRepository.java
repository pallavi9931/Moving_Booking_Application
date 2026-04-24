package com.movie_booking_system.booking_service.domain.repository;

import java.util.List;

public interface BookedSeatRepository {

	List<String> findBookedSeatNumbersByShowId(Long showId);

}
