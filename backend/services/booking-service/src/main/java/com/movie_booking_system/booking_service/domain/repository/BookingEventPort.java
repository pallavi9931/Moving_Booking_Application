package com.movie_booking_system.booking_service.domain.repository;

import com.movie_booking_system.booking_service.domain.model.Booking;

public interface BookingEventPort {

	void publishBookingConfirmed(Booking booking);

}
