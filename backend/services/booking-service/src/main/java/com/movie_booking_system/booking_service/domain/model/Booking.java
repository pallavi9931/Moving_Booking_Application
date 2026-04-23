package com.movie_booking_system.booking_service.domain.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Booking {

	private Long id;
	private Long showId;
	private List<String> seats;
	private String userId;

	public Booking(Long id, Long showId, List<String> seats, String userId) {
		this.id = id;
		this.showId = showId;
		this.seats = seats == null ? new ArrayList<>() : new ArrayList<>(seats);
		this.userId = userId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getShowId() {
		return showId;
	}

	public void setShowId(Long showId) {
		this.showId = showId;
	}

	public List<String> getSeats() {
		return Collections.unmodifiableList(seats);
	}

	public void setSeats(List<String> seats) {
		this.seats = seats == null ? new ArrayList<>() : new ArrayList<>(seats);
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
