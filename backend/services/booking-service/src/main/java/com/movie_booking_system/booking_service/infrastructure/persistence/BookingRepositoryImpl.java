package com.movie_booking_system.booking_service.infrastructure.persistence;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.movie_booking_system.booking_service.domain.model.Booking;
import com.movie_booking_system.booking_service.domain.repository.BookingRepository;

@Repository
public class BookingRepositoryImpl implements BookingRepository {

	private final JpaBookingRepository jpaBookingRepository;
	private final JpaBookingSeatRepository jpaBookingSeatRepository;

	public BookingRepositoryImpl(
			JpaBookingRepository jpaBookingRepository,
			JpaBookingSeatRepository jpaBookingSeatRepository) {
		this.jpaBookingRepository = jpaBookingRepository;
		this.jpaBookingSeatRepository = jpaBookingSeatRepository;
	}

	@Override
	@Transactional
	public Booking save(Booking booking) {
		BookingEntity entity = new BookingEntity();
		entity.setShowId(booking.getShowId());
		BookingEntity saved = jpaBookingRepository.save(entity);
		Long bookingId = saved.getId();
		List<String> persistedSeats = new ArrayList<>();
		for (String seat : booking.getSeats()) {
			BookingSeatEntity seatEntity = new BookingSeatEntity();
			seatEntity.setBookingId(bookingId);
			seatEntity.setSeatNumber(seat);
			BookingSeatEntity savedSeat = jpaBookingSeatRepository.save(seatEntity);
			persistedSeats.add(savedSeat.getSeatNumber());
		}
		Booking result = new Booking(bookingId, saved.getShowId(), persistedSeats, booking.getUserId());
		return result;
	}

}
