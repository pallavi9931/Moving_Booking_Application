package com.movie_booking_system.booking_service.interfaces.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.movie_booking_system.booking_service.application.exception.SeatsNotAvailableException;

@RestControllerAdvice
public class BookingExceptionHandler {

	@ExceptionHandler(SeatsNotAvailableException.class)
	public ResponseEntity<String> handleSeatsNotAvailable(SeatsNotAvailableException ex) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body("Seats not available");
	}

}
