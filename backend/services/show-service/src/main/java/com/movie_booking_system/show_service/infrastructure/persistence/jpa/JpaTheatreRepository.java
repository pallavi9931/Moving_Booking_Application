package com.movie_booking_system.show_service.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.movie_booking_system.show_service.infrastructure.persistence.entity.TheatreEntity;

public interface JpaTheatreRepository extends JpaRepository<TheatreEntity, Long> {
}
