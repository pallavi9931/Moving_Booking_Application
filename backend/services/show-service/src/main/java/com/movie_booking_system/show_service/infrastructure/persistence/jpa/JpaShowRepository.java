package com.movie_booking_system.show_service.infrastructure.persistence.jpa;

import com.movie_booking_system.show_service.infrastructure.persistence.entity.ShowEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaShowRepository extends JpaRepository<ShowEntity, Long> {
}
