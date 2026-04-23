package com.movie_booking_system.show_service.infrastructure.persistence.jpa;

import com.movie_booking_system.show_service.infrastructure.persistence.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMovieRepository extends JpaRepository<MovieEntity, Long> {
}
