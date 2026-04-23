package com.movie_booking_system.show_service.infrastructure.config;

import com.movie_booking_system.show_service.domain.model.Movie;
import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.domain.model.Show;
import com.movie_booking_system.show_service.domain.repository.MovieRepository;
import com.movie_booking_system.show_service.domain.repository.SeatRepository;
import com.movie_booking_system.show_service.domain.repository.ShowRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Inserts a movie, a show, and 30 seats (A1 through A30) on first start when the
 * database is empty. Safe to re-run: skipped when any movie already exists.
 */
@Component
@Order(1)
public class ShowDataInitializer implements CommandLineRunner {

	private static final String SAMPLE_SHOW_TIME = "2026-04-23T18:00:00";

	private final MovieRepository movieRepository;
	private final ShowRepository showRepository;
	private final SeatRepository seatRepository;

	public ShowDataInitializer(MovieRepository movieRepository, ShowRepository showRepository,
			SeatRepository seatRepository) {
		this.movieRepository = movieRepository;
		this.showRepository = showRepository;
		this.seatRepository = seatRepository;
	}

	@Override
	@Transactional
	public void run(String... args) {
		if (movieRepository.count() > 0) {
			return;
		}

		Movie movie = movieRepository.save(new Movie(null, "Inception"));
		Show show = showRepository.save(new Show(null, movie.getId(), SAMPLE_SHOW_TIME));

		for (int i = 1; i <= 30; i++) {
			seatRepository.save(new Seat(null, show.getId(), "A" + i));
		}
	}
}
