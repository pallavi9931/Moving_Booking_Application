package com.movie_booking_system.show_service.domain.model;

import java.util.Objects;

public class Seat {

	private Long id;
	private Long showId;
	private String seatNumber;

	public Seat() {
	}

	public Seat(Long id, Long showId, String seatNumber) {
		this.id = id;
		this.showId = showId;
		this.seatNumber = seatNumber;
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

	public String getSeatNumber() {
		return seatNumber;
	}

	public void setSeatNumber(String seatNumber) {
		this.seatNumber = seatNumber;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Seat seat = (Seat) o;
		return Objects.equals(id, seat.id) && Objects.equals(showId, seat.showId) && Objects.equals(
				seatNumber, seat.seatNumber);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, showId, seatNumber);
	}
}
