import { apiClient } from "../api/apiClient";
class SearchRepositoryImpl {
  async searchMoviesAndShows(query, date, city) {
    const params = {};
    if (query) params.query = query;
    if (date) params.date = date;
    if (city) params.city = city;
    try {
      const response = await apiClient.get("/search", params);
      return response.data;
    } catch {
      // Fallback for demo
      return {
        movies: [
          { movieId: 'm1', title: 'Apex Legends: The Movie', genre: 'Action/Sci-Fi', thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400&h=600', rating: 4.5, duration: '142 min' },
          { movieId: 'm2', title: 'Dune: Awakening', genre: 'Sci-Fi', thumbnailUrl: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400&h=600', rating: 4.8, duration: '155 min' },
          { movieId: 'm3', title: 'Cyber City 2099', genre: 'Action', thumbnailUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400&h=600', rating: 4.2, duration: '128 min' },
          { movieId: 'm4', title: 'Starlight Romance', genre: 'Romance', thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400&h=600', rating: 4.0, duration: '115 min' }
        ],
        shows: [
          { showId: 's101', theatreId: 't1', time: '18:00:00', format: 'IMAX 3D' },
          { showId: 's102', theatreId: 't1', time: '21:30:00', format: 'Standard' }
        ]
      };
    }
  }

  async getMovieDetails(movieId) {
    try {
      const response = await apiClient.get(`/movies/${movieId}`);
      return response.data;
    } catch {
      // Mock data for demo
      const mockMovies = {
        'm1': {
          movieId: 'm1',
          title: 'Apex Legends: The Movie',
          genre: 'Action/Sci-Fi',
          rating: 4.5,
          duration: '142 min',
          releaseDate: '2026-03-15',
          description: 'In a desperate battle for survival in the Outlands, legends unite to uncover a conspiracy that threatens the entire Frontier. High-octane action meets deep character lore in this epic cinematic adaptation.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800&h=1200',
          backdropUrl: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1200&h=600',
          cast: ['Wraith', 'Bloodhound', 'Pathfinder', 'Octane'],
          director: 'Respawn Cinematics'
        },
        'm2': {
          movieId: 'm2',
          title: 'Dune: Awakening',
          genre: 'Sci-Fi',
          rating: 4.8,
          duration: '155 min',
          releaseDate: '2026-04-01',
          description: 'The saga continues as Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=800&h=1200',
          backdropUrl: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=1200&h=600',
          cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
          director: 'Denis Villeneuve'
        },
        'm3': {
          movieId: 'm3',
          title: 'Cyber City 2099',
          genre: 'Action',
          rating: 4.2,
          duration: '128 min',
          releaseDate: '2026-02-10',
          description: 'A mercenary with cybernetic enhancements takes on a corporate giant in the neon-drenched streets of a futuristic metropolis. A visually stunning journey into the heart of a cyberpunk dystopia.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=800&h=1200',
          backdropUrl: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200&h=600',
          cast: ['Keanu Reeves', 'Ana de Armas'],
          director: 'Ridley Scott Jr.'
        },
        'm4': {
          movieId: 'm4',
          title: 'Starlight Romance',
          genre: 'Romance',
          rating: 4.0,
          duration: '115 min',
          releaseDate: '2026-05-20',
          description: 'Two souls find each other across the galaxy in a story of love that transcends space and time. A heartwarming tale of connection in the vastness of the cosmos.',
          thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800&h=1200',
          backdropUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1200&h=600',
          cast: ['Emma Stone', 'Ryan Gosling'],
          director: 'Damien Chazelle'
        }
      };
      return mockMovies[movieId] || mockMovies['m1'];
    }
  }
}
export {
  SearchRepositoryImpl
};
