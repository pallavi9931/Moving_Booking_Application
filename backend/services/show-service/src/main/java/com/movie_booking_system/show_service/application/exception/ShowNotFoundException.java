package com.movie_booking_system.show_service.application.exception;

public class ShowNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private final Long showId;

	public ShowNotFoundException(Long showId) {
		super("Show not found for id: " + showId);
		this.showId = showId;
	}

	public Long getShowId() {
		return showId;
	}
}
