package com.movie_booking_system.show_service.interfaces.dto;

import com.movie_booking_system.show_service.domain.model.Seat;

/**
 * API representation; maps from domain {@link Seat} without adding Jackson concerns to
 * the domain model.
 */
public class SeatResponse {

	private static final int DEFAULT_PRICE = 300;

	private final Long id;
	private final Long showId;
	private final String seatNumber;
	private final String status;
	private final int price;

	public SeatResponse(Long id, Long showId, String seatNumber, String status, int price) {
		this.id = id;
		this.showId = showId;
		this.seatNumber = seatNumber;
		this.status = status;
		this.price = price;
	}

	public static SeatResponse from(Seat seat) {
		return new SeatResponse(seat.getId(), seat.getShowId(), seat.getSeatNumber(), seat.getStatus(), DEFAULT_PRICE);
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

	public int getPrice() {
		return price;
	}
}
