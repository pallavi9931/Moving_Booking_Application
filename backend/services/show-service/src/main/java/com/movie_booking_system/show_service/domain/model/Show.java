package com.movie_booking_system.show_service.domain.model;

import java.util.Objects;

public class Show {

	private Long id;
	private Long movieId;
	private Long theatreId;
	private String showTime;

	public Show() {
	}

	public Show(Long id, Long movieId, Long theatreId, String showTime) {
		this.id = id;
		this.movieId = movieId;
		this.theatreId = theatreId;
		this.showTime = showTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}

	public Long getTheatreId() {
		return theatreId;
	}

	public void setTheatreId(Long theatreId) {
		this.theatreId = theatreId;
	}

	public String getShowTime() {
		return showTime;
	}

	public void setShowTime(String showTime) {
		this.showTime = showTime;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true;
		}
		if (o == null || getClass() != o.getClass()) {
			return false;
		}
		Show show = (Show) o;
		return Objects.equals(id, show.id) && Objects.equals(movieId, show.movieId)
				&& Objects.equals(theatreId, show.theatreId) && Objects.equals(showTime, show.showTime);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, movieId, theatreId, showTime);
	}
}
