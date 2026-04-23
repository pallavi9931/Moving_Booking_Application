package com.movie_booking_system.show_service.domain.repository;

import com.movie_booking_system.show_service.domain.model.Show;
import java.util.Optional;

public interface ShowRepository {

	Show save(Show show);

	Optional<Show> findById(Long id);
}
