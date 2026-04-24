package com.movie_booking_system.booking_service.interfaces.controller;

import java.util.List;

public class SeatStatusResponse {

	private List<String> locked;
	private List<String> booked;

	public SeatStatusResponse() {
	}

	public SeatStatusResponse(List<String> locked, List<String> booked) {
		this.locked = locked;
		this.booked = booked;
	}

	public List<String> getLocked() {
		return locked;
	}

	public void setLocked(List<String> locked) {
		this.locked = locked;
	}

	public List<String> getBooked() {
		return booked;
	}

	public void setBooked(List<String> booked) {
		this.booked = booked;
	}

}
