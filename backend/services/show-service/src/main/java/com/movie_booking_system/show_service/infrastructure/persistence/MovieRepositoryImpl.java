package com.movie_booking_system.show_service.infrastructure.persistence;

import com.movie_booking_system.show_service.domain.model.Movie;
import com.movie_booking_system.show_service.domain.repository.MovieRepository;
import com.movie_booking_system.show_service.infrastructure.persistence.entity.MovieEntity;
import com.movie_booking_system.show_service.infrastructure.persistence.jpa.JpaMovieRepository;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class MovieRepositoryImpl implements MovieRepository {

	private final JpaMovieRepository jpaMovieRepository;

	public MovieRepositoryImpl(JpaMovieRepository jpaMovieRepository) {
		this.jpaMovieRepository = jpaMovieRepository;
	}

	@Override
	public Movie save(Movie movie) {
		MovieEntity entity = toEntity(movie);
		MovieEntity saved = jpaMovieRepository.save(entity);
		return toDomain(saved);
	}

	@Override
	public Optional<Movie> findById(Long id) {
		return jpaMovieRepository.findById(id).map(this::toDomain);
	}

	@Override
	public long count() {
		return jpaMovieRepository.count();
	}

	private MovieEntity toEntity(Movie movie) {
		MovieEntity entity = new MovieEntity();
		if (movie.getId() != null) {
			entity.setId(movie.getId());
		}
		entity.setName(movie.getName());
		return entity;
	}

	private Movie toDomain(MovieEntity entity) {
		return new Movie(entity.getId(), entity.getName());
	}
}
