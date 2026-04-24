package com.movie_booking_system.show_service.infrastructure.booking;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class BookingSeatStatusJson {

	private List<String> locked;
	private List<String> booked;

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
