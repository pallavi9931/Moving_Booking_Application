package com.movie_booking_system.show_service.infrastructure.persistence;

import com.movie_booking_system.show_service.domain.model.Show;
import com.movie_booking_system.show_service.domain.repository.ShowRepository;
import com.movie_booking_system.show_service.infrastructure.persistence.entity.ShowEntity;
import com.movie_booking_system.show_service.infrastructure.persistence.jpa.JpaShowRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class ShowRepositoryImpl implements ShowRepository {

	private final JpaShowRepository jpaShowRepository;

	public ShowRepositoryImpl(JpaShowRepository jpaShowRepository) {
		this.jpaShowRepository = jpaShowRepository;
	}

	@Override
	public Show save(Show show) {
		ShowEntity entity = toEntity(show);
		ShowEntity saved = jpaShowRepository.save(entity);
		return toDomain(saved);
	}

	@Override
	public Optional<Show> findById(Long id) {
		return jpaShowRepository.findById(id).map(this::toDomain);
	}

	private ShowEntity toEntity(Show show) {
		ShowEntity entity = new ShowEntity();
		if (show.getId() != null) {
			entity.setId(show.getId());
		}
		entity.setMovieId(show.getMovieId());
		entity.setShowTime(show.getShowTime());
		return entity;
	}

	private Show toDomain(ShowEntity entity) {
		return new Show(entity.getId(), entity.getMovieId(), entity.getShowTime());
	}
}
