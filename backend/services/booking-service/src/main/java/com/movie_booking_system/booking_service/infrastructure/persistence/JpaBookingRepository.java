package com.movie_booking_system.booking_service.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaBookingRepository extends JpaRepository<BookingEntity, Long> {

}
