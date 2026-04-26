package com.movie_booking_system.api_gateway.domain;

import java.time.Instant;

public class TokenBlacklist {

	private final Long id;

	private final String token;

	private final Instant expiry;

	public TokenBlacklist(Long id, String token, Instant expiry) {
		this.id = id;
		this.token = token;
		this.expiry = expiry;
	}

	public Long getId() {
		return id;
	}

	public String getToken() {
		return token;
	}

	public Instant getExpiry() {
		return expiry;
	}
}
