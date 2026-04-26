package com.movie_booking_system.show_service.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.movie_booking_system.show_service.infrastructure.persistence.entity.ShowEntity;
import com.movie_booking_system.show_service.interfaces.dto.ShowSummaryResponse;

public interface JpaShowRepository extends JpaRepository<ShowEntity, Long> {

	@Query("SELECT new com.movie_booking_system.show_service.interfaces.dto.ShowSummaryResponse(s.id, m.name, t.name, s.showTime, m.id) "
			+ "FROM ShowEntity s, MovieEntity m, TheatreEntity t "
			+ "WHERE s.movieId = m.id AND s.theatreId = t.id ORDER BY s.id")
	List<ShowSummaryResponse> findAllSummaries();
}
