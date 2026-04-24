package com.movie_booking_system.show_service.interfaces.dto;

import com.movie_booking_system.show_service.domain.model.Seat;

/**
 * API representation; maps from domain {@link Seat} without adding Jackson concerns to
 * the domain model.
 */
public class SeatResponse {

	private final Long id;
	private final Long showId;
	private final String seatNumber;
	private final String status;

	public SeatResponse(Long id, Long showId, String seatNumber, String status) {
		this.id = id;
		this.showId = showId;
		this.seatNumber = seatNumber;
		this.status = status;
	}

	public static SeatResponse from(Seat seat) {
		return new SeatResponse(seat.getId(), seat.getShowId(), seat.getSeatNumber(), seat.getStatus());
	}

	public Long getId() {
		return id;
	}

	public Long getShowId() {
		return showId;
	}

	public String getSeatNumber() {
		return seatNumber;
	}

	public String getStatus() {
		return status;
	}
}
