package com.movie_booking_system.show_service.infrastructure.persistence;

import org.springframework.stereotype.Repository;

import com.movie_booking_system.show_service.domain.model.Theatre;
import com.movie_booking_system.show_service.domain.repository.TheatreRepository;
import com.movie_booking_system.show_service.infrastructure.persistence.entity.TheatreEntity;
import com.movie_booking_system.show_service.infrastructure.persistence.jpa.JpaTheatreRepository;

@Repository
public class TheatreRepositoryImpl implements TheatreRepository {

	private final JpaTheatreRepository jpaTheatreRepository;

	public TheatreRepositoryImpl(JpaTheatreRepository jpaTheatreRepository) {
		this.jpaTheatreRepository = jpaTheatreRepository;
	}

	@Override
	public Theatre save(Theatre theatre) {
		TheatreEntity entity = new TheatreEntity();
		if (theatre.getId() != null) {
			entity.setId(theatre.getId());
		}
		entity.setName(theatre.getName());
		TheatreEntity saved = jpaTheatreRepository.save(entity);
		return new Theatre(saved.getId(), saved.getName());
	}

	@Override
	public long count() {
		return jpaTheatreRepository.count();
	}
}
