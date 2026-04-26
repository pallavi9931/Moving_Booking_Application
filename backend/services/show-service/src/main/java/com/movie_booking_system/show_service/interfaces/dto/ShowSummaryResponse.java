package com.movie_booking_system.show_service.interfaces.dto;

public class ShowSummaryResponse {

	private Long showId;
	private String movieTitle;
	private String theatreName;
	private String showTime;
	private Long movieId;

	public ShowSummaryResponse() {
	}

	public ShowSummaryResponse(Long showId, String movieTitle, String theatreName, String showTime, Long movieId) {
		this.showId = showId;
		this.movieTitle = movieTitle;
		this.theatreName = theatreName;
		this.showTime = showTime;
		this.movieId = movieId;
	}

	public Long getShowId() {
		return showId;
	}

	public void setShowId(Long showId) {
		this.showId = showId;
	}

	public String getMovieTitle() {
		return movieTitle;
	}

	public void setMovieTitle(String movieTitle) {
		this.movieTitle = movieTitle;
	}

	public String getTheatreName() {
		return theatreName;
	}

	public void setTheatreName(String theatreName) {
		this.theatreName = theatreName;
	}

	public String getShowTime() {
		return showTime;
	}

	public void setShowTime(String showTime) {
		this.showTime = showTime;
	}

	public Long getMovieId() {
		return movieId;
	}

	public void setMovieId(Long movieId) {
		this.movieId = movieId;
	}
}
