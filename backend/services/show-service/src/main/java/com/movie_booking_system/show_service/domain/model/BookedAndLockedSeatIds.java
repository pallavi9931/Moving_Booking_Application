package com.movie_booking_system.show_service.domain.model;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public final class BookedAndLockedSeatIds {

	private final Set<String> booked;
	private final Set<String> locked;

	public BookedAndLockedSeatIds(List<String> booked, List<String> locked) {
		this.booked = Collections.unmodifiableSet(new HashSet<>(booked));
		this.locked = Collections.unmodifiableSet(new HashSet<>(locked));
	}

	public Set<String> getBooked() {
		return booked;
	}

	public Set<String> getLocked() {
		return locked;
	}

}
