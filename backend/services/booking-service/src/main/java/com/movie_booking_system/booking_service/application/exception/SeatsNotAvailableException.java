package com.movie_booking_system.booking_service.application.exception;

public class SeatsNotAvailableException extends RuntimeException {

	public SeatsNotAvailableException(String message) {
		super(message);
	}

}
