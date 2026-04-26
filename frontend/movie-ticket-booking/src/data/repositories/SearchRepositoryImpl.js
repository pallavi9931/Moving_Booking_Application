import { apiClient } from "../api/apiClient";

const POSTERS = [
  "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400&h=600",
  "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400&h=600",
  "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400&h=600",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400&h=600",
  "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=400&h=600",
  "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=400&h=600",
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400&h=600"
];

function posterForIndex(i) {
  return POSTERS[i % POSTERS.length];
}

class SearchRepositoryImpl {
  async searchMoviesAndShows(query, date, city) {
    const rows = await apiClient.get("/shows");
    const moviesMap = new Map();
    const shows = [];
    rows.forEach((r, idx) => {
      const movieId = String(r.movieId);
      if (!moviesMap.has(movieId)) {
        moviesMap.set(movieId, {
          movieId,
          title: r.movieTitle,
          genre: "Now showing",
          thumbnailUrl: posterForIndex(moviesMap.size),
          rating: 4.5,
          duration: "2h 10m"
        });
      }
      shows.push({
        showId: String(r.showId),
        movieId,
        theatreId: null,
        theatreName: r.theatreName,
        time: r.showTime,
        format: "Standard"
      });
    });
    return {
      movies: [...moviesMap.values()],
      shows
    };
  }

  async getMovieDetails(movieId) {
    const rows = await apiClient.get("/shows");
    const mid = String(movieId);
    const first = rows.find((r) => String(r.movieId) === mid);
    if (!first) {
      throw new Error("Movie not found");
    }
    const poster = posterForIndex(Number(mid) || 0);
    return {
      movieId: mid,
      title: first.movieTitle,
      genre: "Feature",
      rating: 4.5,
      duration: "2h 10m",
      releaseDate: "2026",
      description: `Book tickets for ${first.movieTitle}.`,
      thumbnailUrl: poster,
      backdropUrl: poster,
      cast: [],
      director: "Various"
    };
  }
}

export { SearchRepositoryImpl };
