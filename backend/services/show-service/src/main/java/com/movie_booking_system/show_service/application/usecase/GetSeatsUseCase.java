package com.movie_booking_system.show_service.application.usecase;

import com.movie_booking_system.show_service.application.exception.ShowNotFoundException;
import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.domain.repository.SeatRepository;
import com.movie_booking_system.show_service.domain.repository.ShowRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GetSeatsUseCase {

	private final ShowRepository showRepository;
	private final SeatRepository seatRepository;

	public GetSeatsUseCase(ShowRepository showRepository, SeatRepository seatRepository) {
		this.showRepository = showRepository;
		this.seatRepository = seatRepository;
	}

	@Transactional(readOnly = true)
	public List<Seat> execute(Long showId) {
		if (showRepository.findById(showId).isEmpty()) {
			throw new ShowNotFoundException(showId);
		}
		return seatRepository.findByShowId(showId);
	}
}
