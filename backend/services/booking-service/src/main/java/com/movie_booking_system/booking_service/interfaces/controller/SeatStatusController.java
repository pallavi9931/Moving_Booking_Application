package com.movie_booking_system.booking_service.interfaces.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movie_booking_system.booking_service.application.usecase.GetSeatStatusUseCase;
import com.movie_booking_system.booking_service.application.usecase.SeatStatusResult;

@RestController
@RequestMapping("/booking/seats")
public class SeatStatusController {

	private final GetSeatStatusUseCase getSeatStatusUseCase;

	public SeatStatusController(GetSeatStatusUseCase getSeatStatusUseCase) {
		this.getSeatStatusUseCase = getSeatStatusUseCase;
	}

	@GetMapping("/status")
	public SeatStatusResponse getSeatStatus(@RequestParam("showId") Long showId) {
		SeatStatusResult result = getSeatStatusUseCase.execute(showId);
		return new SeatStatusResponse(result.getLocked(), result.getBooked());
	}

}
