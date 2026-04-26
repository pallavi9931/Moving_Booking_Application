package com.movie_booking_system.api_gateway.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaTokenBlacklistRepository extends JpaRepository<TokenBlacklistEntity, Long> {

	boolean existsByToken(String token);
}
