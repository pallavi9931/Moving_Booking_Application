package com.movie_booking_system.show_service.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movie_booking_system.show_service.infrastructure.persistence.jpa.JpaShowRepository;
import com.movie_booking_system.show_service.interfaces.dto.ShowSummaryResponse;

@Service
public class GetShowsListUseCase {

	private final JpaShowRepository jpaShowRepository;

	public GetShowsListUseCase(JpaShowRepository jpaShowRepository) {
		this.jpaShowRepository = jpaShowRepository;
	}

	@Transactional(readOnly = true)
	public List<ShowSummaryResponse> execute() {
		return jpaShowRepository.findAllSummaries();
	}
}
