package com.movie_booking_system.show_service.interfaces.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie_booking_system.show_service.application.usecase.GetSeatsUseCase;
import com.movie_booking_system.show_service.application.usecase.GetShowsListUseCase;
import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.interfaces.dto.SeatResponse;
import com.movie_booking_system.show_service.interfaces.dto.ShowSummaryResponse;

@RestController
@RequestMapping
public class ShowController {

	private final GetSeatsUseCase getSeatsUseCase;

	private final GetShowsListUseCase getShowsListUseCase;

	public ShowController(GetSeatsUseCase getSeatsUseCase, GetShowsListUseCase getShowsListUseCase) {
		this.getSeatsUseCase = getSeatsUseCase;
		this.getShowsListUseCase = getShowsListUseCase;
	}

	@GetMapping("/shows")
	public List<ShowSummaryResponse> listShows() {
		return getShowsListUseCase.execute();
	}

	@GetMapping("/shows/{showId}/seats")
	public List<SeatResponse> getSeats(@PathVariable("showId") Long showId) {
		List<Seat> seats = getSeatsUseCase.execute(showId);
		return seats.stream().map(SeatResponse::from).toList();
	}
}
