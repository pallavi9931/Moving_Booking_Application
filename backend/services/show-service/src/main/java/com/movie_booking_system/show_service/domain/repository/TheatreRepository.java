package com.movie_booking_system.show_service.domain.repository;

import com.movie_booking_system.show_service.domain.model.Theatre;

public interface TheatreRepository {

	Theatre save(Theatre theatre);

	long count();
}
