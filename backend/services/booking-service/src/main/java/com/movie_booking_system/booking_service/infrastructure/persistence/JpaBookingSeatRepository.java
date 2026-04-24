package com.movie_booking_system.booking_service.infrastructure.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaBookingSeatRepository extends JpaRepository<BookingSeatEntity, Long> {

	@Query(
			value = "SELECT bs.seat_number FROM booking_seats bs INNER JOIN bookings b ON bs.booking_id = b.id WHERE b.show_id = :showId",
			nativeQuery = true)
	List<String> findSeatNumbersByShowId(@Param("showId") Long showId);

}
