package com.movie_booking_system.api_gateway.auth;

import java.util.Map;
import java.util.Optional;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movie_booking_system.api_gateway.domain.TokenBlacklistRepository;
import com.movie_booking_system.api_gateway.domain.User;
import com.movie_booking_system.api_gateway.domain.UserRepository;
import com.movie_booking_system.api_gateway.jwt.JwtUtil;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private static final String BEARER_PREFIX = "Bearer ";

	private final JwtUtil jwtUtil;

	private final TokenBlacklistRepository tokenBlacklistRepository;

	private final UserRepository userRepository;

	public AuthController(JwtUtil jwtUtil, TokenBlacklistRepository tokenBlacklistRepository,
			UserRepository userRepository) {
		this.jwtUtil = jwtUtil;
		this.tokenBlacklistRepository = tokenBlacklistRepository;
		this.userRepository = userRepository;
	}

	@PostMapping("/register")
	public Mono<ResponseEntity<Map<String, String>>> register(@RequestBody LoginRequest request) {
		return Mono.fromCallable(() -> processRegister(request)).subscribeOn(Schedulers.boundedElastic());
	}

	private ResponseEntity<Map<String, String>> processRegister(LoginRequest request) {
		if (request.getUsername() == null || request.getPassword() == null) {
			return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
		}
		String username = request.getUsername().trim();
		String password = request.getPassword().trim();
		if (username.isEmpty() || password.isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
		}
		if (userRepository.findByUsername(username).isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "User already exists"));
		}
		try {
			User user = new User();
			user.setUsername(username);
			user.setPassword(password);
			User saved = userRepository.save(user);
			String token = jwtUtil.generateToken(saved.getUsername());
			return ResponseEntity.ok(Map.of("token", token));
		}
		catch (DataIntegrityViolationException ex) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "User already exists"));
		}
		catch (Exception ex) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("error", "Could not save user. Check MySQL is running and gateway_db exists."));
		}
	}

	@PostMapping("/login")
	public Mono<ResponseEntity<Map<String, String>>> login(@RequestBody LoginRequest request) {
		return Mono.fromCallable(() -> processLogin(request)).subscribeOn(Schedulers.boundedElastic());
	}

	private ResponseEntity<Map<String, String>> processLogin(LoginRequest request) {
		if (request.getUsername() == null || request.getPassword() == null) {
			return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
		}
		String username = request.getUsername().trim();
		String password = request.getPassword().trim();
		if (username.isEmpty() || password.isEmpty()) {
			return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
		}
		Optional<User> opt = userRepository.findByUsername(username);
		if (opt.isEmpty() || !opt.get().getPassword().equals(password)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
		}
		String token = jwtUtil.generateToken(opt.get().getUsername());
		return ResponseEntity.ok(Map.of("token", token));
	}

	@PostMapping("/logout")
	public Mono<ResponseEntity<Map<String, String>>> logout(
			@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authorization) {
		return Mono.fromCallable(() -> processLogout(authorization)).subscribeOn(Schedulers.boundedElastic());
	}

	private ResponseEntity<Map<String, String>> processLogout(String authorization) {
		if (authorization == null || !authorization.startsWith(BEARER_PREFIX)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("error", "Missing or invalid Authorization header"));
		}
		String token = authorization.substring(BEARER_PREFIX.length()).trim();
		if (token.isEmpty() || !jwtUtil.validateToken(token)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token"));
		}
		tokenBlacklistRepository.save(token, jwtUtil.extractExpiry(token));
		return ResponseEntity.ok(Map.of("message", "Logged out"));
	}
}
