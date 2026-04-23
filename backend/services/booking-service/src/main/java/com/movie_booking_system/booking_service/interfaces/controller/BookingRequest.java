package com.movie_booking_system.booking_service.interfaces.controller;

import java.util.List;

public class BookingRequest {

	private Long showId;
	private List<String> seats;
	private String userId;

	public Long getShowId() {
		return showId;
	}

	public void setShowId(Long showId) {
		this.showId = showId;
	}

	public List<String> getSeats() {
		return seats;
	}

	public void setSeats(List<String> seats) {
		this.seats = seats;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
