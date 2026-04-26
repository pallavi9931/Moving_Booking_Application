package com.movie_booking_system.api_gateway.infrastructure.persistence;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.movie_booking_system.api_gateway.domain.User;
import com.movie_booking_system.api_gateway.domain.UserRepository;

@Repository
public class UserRepositoryImpl implements UserRepository {

	private final JpaUserRepository jpaUserRepository;

	public UserRepositoryImpl(JpaUserRepository jpaUserRepository) {
		this.jpaUserRepository = jpaUserRepository;
	}

	@Override
	public Optional<User> findByUsername(String username) {
		return jpaUserRepository.findByUsername(username).map(this::toDomain);
	}

	@Override
	public User save(User user) {
		UserEntity entity = new UserEntity();
		entity.setId(user.getId());
		entity.setUsername(user.getUsername());
		entity.setPassword(user.getPassword());
		return toDomain(jpaUserRepository.save(entity));
	}

	private User toDomain(UserEntity entity) {
		return new User(entity.getId(), entity.getUsername(), entity.getPassword());
	}
}
