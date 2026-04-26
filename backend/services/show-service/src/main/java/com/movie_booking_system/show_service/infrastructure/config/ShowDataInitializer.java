package com.movie_booking_system.show_service.infrastructure.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.movie_booking_system.show_service.domain.model.Movie;
import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.domain.model.Show;
import com.movie_booking_system.show_service.domain.model.Theatre;
import com.movie_booking_system.show_service.domain.repository.MovieRepository;
import com.movie_booking_system.show_service.domain.repository.SeatRepository;
import com.movie_booking_system.show_service.domain.repository.ShowRepository;
import com.movie_booking_system.show_service.domain.repository.TheatreRepository;

/**
 * Seeds theatres, movies, shows, and seats when the catalogue is empty (no theatres yet).
 */
@Component
@Order(1)
public class ShowDataInitializer implements CommandLineRunner {

	private static final int SEATS_PER_SHOW = 30;

	private final MovieRepository movieRepository;
	private final TheatreRepository theatreRepository;
	private final ShowRepository showRepository;
	private final SeatRepository seatRepository;

	public ShowDataInitializer(MovieRepository movieRepository, TheatreRepository theatreRepository,
			ShowRepository showRepository, SeatRepository seatRepository) {
		this.movieRepository = movieRepository;
		this.theatreRepository = theatreRepository;
		this.showRepository = showRepository;
		this.seatRepository = seatRepository;
	}

	@Override
	@Transactional
	public void run(String... args) {
		if (theatreRepository.count() >= 4) {
			return;
		}

		Theatre t1 = theatreRepository.save(new Theatre(null, "IMAX Zenith"));
		Theatre t2 = theatreRepository.save(new Theatre(null, "Cineplex Royale"));
		Theatre t3 = theatreRepository.save(new Theatre(null, "Neon Dreams"));
		Theatre t4 = theatreRepository.save(new Theatre(null, "Starlight Drive-in"));

		Movie m1 = movieRepository.save(new Movie(null, "Inception"));
		Movie m2 = movieRepository.save(new Movie(null, "Dune: Part Two"));
		Movie m3 = movieRepository.save(new Movie(null, "Oppenheimer"));
		Movie m4 = movieRepository.save(new Movie(null, "The Batman"));
		Movie m5 = movieRepository.save(new Movie(null, "Everything Everywhere"));
		Movie m6 = movieRepository.save(new Movie(null, "Poor Things"));
		Movie m7 = movieRepository.save(new Movie(null, "Past Lives"));

		createShowWithSeats(m1.getId(), t1.getId(), "2026-04-26T10:00:00");
		createShowWithSeats(m1.getId(), t2.getId(), "2026-04-26T14:30:00");
		createShowWithSeats(m2.getId(), t1.getId(), "2026-04-26T18:00:00");
		createShowWithSeats(m2.getId(), t3.getId(), "2026-04-26T21:15:00");
		createShowWithSeats(m3.getId(), t4.getId(), "2026-04-27T11:00:00");
		createShowWithSeats(m4.getId(), t2.getId(), "2026-04-27T15:45:00");
		createShowWithSeats(m5.getId(), t1.getId(), "2026-04-27T19:30:00");
	}

	private void createShowWithSeats(Long movieId, Long theatreId, String showTime) {
		Show show = showRepository.save(new Show(null, movieId, theatreId, showTime));
		for (int i = 1; i <= SEATS_PER_SHOW; i++) {
			seatRepository.save(new Seat(null, show.getId(), "A" + i));
		}
	}
}
