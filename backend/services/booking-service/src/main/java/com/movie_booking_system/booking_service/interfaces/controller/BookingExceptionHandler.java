package com.movie_booking_system.booking_service.interfaces.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.movie_booking_system.booking_service.application.exception.SeatsNotAvailableException;

@RestControllerAdvice
public class BookingExceptionHandler {

	@ExceptionHandler(SeatsNotAvailableException.class)
	public ResponseEntity<Map<String, String>> handleSeats(SeatsNotAvailableException ex) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", ex.getMessage()));
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Map<String, String>> handleBadRequest(IllegalArgumentException ex) {
		return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
	}
}
