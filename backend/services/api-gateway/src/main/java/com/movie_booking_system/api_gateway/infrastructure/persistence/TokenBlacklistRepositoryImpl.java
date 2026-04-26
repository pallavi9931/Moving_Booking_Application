package com.movie_booking_system.api_gateway.infrastructure.persistence;

import java.time.Instant;

import org.springframework.stereotype.Repository;

import com.movie_booking_system.api_gateway.domain.TokenBlacklistRepository;

@Repository
public class TokenBlacklistRepositoryImpl implements TokenBlacklistRepository {

	private final JpaTokenBlacklistRepository jpaTokenBlacklistRepository;

	public TokenBlacklistRepositoryImpl(JpaTokenBlacklistRepository jpaTokenBlacklistRepository) {
		this.jpaTokenBlacklistRepository = jpaTokenBlacklistRepository;
	}

	@Override
	public void save(String token, Instant expiry) {
		TokenBlacklistEntity entity = new TokenBlacklistEntity();
		entity.setToken(token);
		entity.setExpiry(expiry);
		jpaTokenBlacklistRepository.save(entity);
	}

	@Override
	public boolean exists(String token) {
		return jpaTokenBlacklistRepository.existsByToken(token);
	}
}
