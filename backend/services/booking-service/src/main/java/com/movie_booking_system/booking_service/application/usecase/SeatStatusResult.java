package com.movie_booking_system.booking_service.application.usecase;

import java.util.List;

public final class SeatStatusResult {

	private final List<String> locked;
	private final List<String> booked;

	public SeatStatusResult(List<String> locked, List<String> booked) {
		this.locked = List.copyOf(locked);
		this.booked = List.copyOf(booked);
	}

	public List<String> getLocked() {
		return locked;
	}

	public List<String> getBooked() {
		return booked;
	}

}
