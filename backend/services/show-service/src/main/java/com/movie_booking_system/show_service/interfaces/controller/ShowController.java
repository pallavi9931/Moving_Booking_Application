package com.movie_booking_system.show_service.interfaces.controller;

import com.movie_booking_system.show_service.application.usecase.GetSeatsUseCase;
import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.interfaces.dto.SeatResponse;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class ShowController {

	private final GetSeatsUseCase getSeatsUseCase;

	public ShowController(GetSeatsUseCase getSeatsUseCase) {
		this.getSeatsUseCase = getSeatsUseCase;
	}

	@GetMapping("/shows/{showId}/seats")
	public List<SeatResponse> getSeats(@PathVariable("showId") Long showId) {
		List<Seat> seats = getSeatsUseCase.execute(showId);
		return seats.stream().map(SeatResponse::from).toList();
	}
}
