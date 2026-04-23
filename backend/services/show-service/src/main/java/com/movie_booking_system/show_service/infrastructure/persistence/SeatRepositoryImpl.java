package com.movie_booking_system.show_service.infrastructure.persistence;

import com.movie_booking_system.show_service.domain.model.Seat;
import com.movie_booking_system.show_service.domain.repository.SeatRepository;
import com.movie_booking_system.show_service.infrastructure.persistence.entity.SeatEntity;
import com.movie_booking_system.show_service.infrastructure.persistence.jpa.JpaSeatRepository;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class SeatRepositoryImpl implements SeatRepository {

	private final JpaSeatRepository jpaSeatRepository;

	public SeatRepositoryImpl(JpaSeatRepository jpaSeatRepository) {
		this.jpaSeatRepository = jpaSeatRepository;
	}

	@Override
	public List<Seat> findByShowId(Long showId) {
		return jpaSeatRepository.findByShowId(showId).stream().map(this::toDomain).toList();
	}

	@Override
	public Seat save(Seat seat) {
		SeatEntity entity = toEntity(seat);
		SeatEntity saved = jpaSeatRepository.save(entity);
		return toDomain(saved);
	}

	private SeatEntity toEntity(Seat seat) {
		SeatEntity entity = new SeatEntity();
		if (seat.getId() != null) {
			entity.setId(seat.getId());
		}
		entity.setShowId(seat.getShowId());
		entity.setSeatNumber(seat.getSeatNumber());
		return entity;
	}

	private Seat toDomain(SeatEntity entity) {
		return new Seat(entity.getId(), entity.getShowId(), entity.getSeatNumber());
	}
}
