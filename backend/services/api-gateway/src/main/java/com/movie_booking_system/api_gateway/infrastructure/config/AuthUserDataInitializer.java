package com.movie_booking_system.api_gateway.infrastructure.config;

import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.movie_booking_system.api_gateway.domain.User;
import com.movie_booking_system.api_gateway.domain.UserRepository;

/**
 * Ensures demo accounts exist with known passwords. Creates missing users; resets password to the
 * expected value if the row already exists (fixes DBs where user1 was registered with another password).
 */
@Component
@Order(2)
public class AuthUserDataInitializer implements CommandLineRunner {

	private final UserRepository userRepository;

	public AuthUserDataInitializer(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public void run(String... args) {
		ensureDemoUser("user1", "123");
		ensureDemoUser("user2", "123");
	}

	private void ensureDemoUser(String username, String password) {
		Optional<User> existing = userRepository.findByUsername(username);
		if (existing.isEmpty()) {
			User u = new User();
			u.setUsername(username);
			u.setPassword(password);
			userRepository.save(u);
			return;
		}
		User u = existing.get();
		if (!password.equals(u.getPassword())) {
			u.setPassword(password);
			userRepository.save(u);
		}
	}
}
