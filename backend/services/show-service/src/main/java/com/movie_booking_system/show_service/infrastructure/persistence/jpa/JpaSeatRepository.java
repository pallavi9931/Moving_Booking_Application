package com.movie_booking_system.show_service.infrastructure.persistence.jpa;

import com.movie_booking_system.show_service.infrastructure.persistence.entity.SeatEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaSeatRepository extends JpaRepository<SeatEntity, Long> {

	List<SeatEntity> findByShowId(Long showId);
}
