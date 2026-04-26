package com.movie_booking_system.api_gateway.domain;

import java.util.Optional;

public interface UserRepository {

	Optional<User> findByUsername(String username);

	User save(User user);
}
