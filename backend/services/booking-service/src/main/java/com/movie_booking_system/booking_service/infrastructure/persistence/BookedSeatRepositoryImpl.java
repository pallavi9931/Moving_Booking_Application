package com.movie_booking_system.booking_service.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.movie_booking_system.booking_service.domain.repository.BookedSeatRepository;

@Repository
public class BookedSeatRepositoryImpl implements BookedSeatRepository {

	private final JpaBookingSeatRepository jpaBookingSeatRepository;

	public BookedSeatRepositoryImpl(JpaBookingSeatRepository jpaBookingSeatRepository) {
		this.jpaBookingSeatRepository = jpaBookingSeatRepository;
	}

	@Override
	public List<String> findBookedSeatNumbersByShowId(Long showId) {
		return jpaBookingSeatRepository.findSeatNumbersByShowId(showId);
	}

}
