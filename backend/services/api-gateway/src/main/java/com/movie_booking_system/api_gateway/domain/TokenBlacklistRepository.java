package com.movie_booking_system.api_gateway.domain;

import java.time.Instant;

public interface TokenBlacklistRepository {

	void save(String token, Instant expiry);

	boolean exists(String token);
}
