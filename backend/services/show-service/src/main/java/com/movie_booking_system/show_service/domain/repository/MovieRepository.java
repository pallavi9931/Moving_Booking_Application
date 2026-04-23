package com.movie_booking_system.show_service.domain.repository;

import com.movie_booking_system.show_service.domain.model.Movie;
import java.util.Optional;

public interface MovieRepository {

	Movie save(Movie movie);

	Optional<Movie> findById(Long id);

	long count();
}
