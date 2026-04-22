import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMoviesUseCase } from '../../core/di';
import { Play, Star, Clock, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';


const TRENDING_MOVIES = [
  {
    id: 't1',
    title: 'Interstellar: Reborn',
    subtitle: 'Experience the next dimension in IMAX',
    poster: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=1200&h=500',
    rating: 4.9,
    genre: 'Sci-Fi'
  },
  {
    id: 't2',
    title: 'Neon Nights',
    subtitle: 'A cyberpunk thriller that will keep you on the edge',
    poster: 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=1200&h=500',
    rating: 4.8,
    genre: 'Action'
  }
];

const GENRES = ['All', 'Action', 'Sci-Fi', 'Comedy', 'Drama', 'Horror', 'Romance', 'Thriller'];
const THEATRES = ['IMAX Zenith', 'Cineplex Royale', 'Neon Dreams Auto-Theatre', 'Starlight Drive-in'];

export default function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState('All');
  const [activeTheatre, setActiveTheatre] = useState('IMAX Zenith');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
  
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TRENDING_MOVIES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    searchMoviesUseCase.execute().then((res) => {
      setMovies(res.movies || []);
      setShows(res.shows || []);
      setLoading(false);
    }).catch(() => {
      setMovies([
        { movieId: 'm1', title: 'Apex Legends: The Movie', genre: 'Action/Sci-Fi', thumbnailUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=400&h=600' },
        { movieId: 'm2', title: 'Dune: Awakening', genre: 'Sci-Fi', thumbnailUrl: 'https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=400&h=600' },
        { movieId: 'm3', title: 'Cyber City 2099', genre: 'Action', thumbnailUrl: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400&h=600' },
        { movieId: 'm4', title: 'Starlight Romance', genre: 'Romance', thumbnailUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400&h=600' }
      ]);
      setShows([
        { showId: 's101', theatreId: 't1', time: '18:00:00', format: 'IMAX 3D' },
        { showId: 's102', theatreId: 't1', time: '21:30:00', format: 'Standard' }
      ]);
      setLoading(false);
    });
  }, []);

  const slide = TRENDING_MOVIES[currentSlide];

  if (loading) return (
    <div className="flex-center" style={{ height: '80vh' }}>
      <div className="spinner-large"></div>
    </div>
  );

  return (
    <div className="home-container">
      
      
      <section className="hero-section">
        <div className="hero-slide" style={{ backgroundImage: `url(${slide.poster})` }}>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div className="flex align-center gap-2 mb-4">
              <span className="badge bms-badge animate-pulse">Now Playing</span>
              <span className="badge bms-badge-outline">IMAX Experience</span>
            </div>
            <h1 className="hero-title">{slide.title}</h1>
            <p className="hero-subtitle">{slide.subtitle}</p>
            <div className="hero-meta">
              <span className="meta-item"><Star className="text-warning" size={18} fill="currentColor" /> {slide.rating}</span>
              <span className="meta-item">{slide.genre}</span>
            </div>
            <div className="hero-actions">
              <button 
                className="btn btn-primary btn-lg flex-center gap-2"
                onClick={() => {
                  const element = document.getElementById('now-showing');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Play size={20} fill="currentColor" /> Get Tickets
              </button>
              <button 
                className="btn btn-outline btn-lg"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
              >
                Watch Trailer
              </button>
            </div>
          </div>
          
          <div className="hero-controls">
            <button className="icon-btn glass" onClick={() => setCurrentSlide(prev => (prev === 0 ? TRENDING_MOVIES.length - 1 : prev - 1))}>
              <ChevronLeft />
            </button>
            <button className="icon-btn glass" onClick={() => setCurrentSlide(prev => (prev + 1) % TRENDING_MOVIES.length)}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

  
      <div className="content-layout">
        

        <section className="theatre-options scroll-x mt-20">
          <h3 className="section-title">Select Theatre</h3>
          <div className="pills-container">
            {THEATRES.map(theatre => (
              <button 
                key={theatre}
                className={`pill-btn ${activeTheatre === theatre ? 'active' : ''}`}
                onClick={() => setActiveTheatre(theatre)}
              >
                <MapPin size={16} /> {theatre}
              </button>
            ))}
          </div>
        </section>

        
        <section className="movie-options scroll-x mt-20">
          <h3 className="section-title">Browse by Genre</h3>
          <div className="pills-container">
            {GENRES.map(genre => (
              <button 
                key={genre}
                className={`genre-btn ${activeGenre === genre ? 'active' : ''}`}
                onClick={() => setActiveGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

      
        <section className="movies-section mt-24 mb-32">
          <div className="section-header" id="now-showing">
            <div>
              <h2 className="section-title text-gradient">Premiere Selection</h2>
              <p className="text-muted">Handpicked cinematic masterpieces for you</p>
            </div>
          </div>
          
          <div className="movie-grid gap-12">
            {movies.filter(m => activeGenre === 'All' || m.genre.includes(activeGenre)).map(movie => (
              <div key={movie.movieId} className="movie-card">
                <div className="movie-poster">
                  <img src={movie.thumbnailUrl} alt={movie.title} />
                  <div className="movie-poster-overlay">
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/movies/${movie.movieId}`)}
                    >
                      Details
                    </button>
                  </div>
                </div>
                
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-genre">{movie.genre}</p>
                  
                  <div className="showtimes mt-4">
                    <div className="showtimes-label"><Clock size={14} /> Available Shows</div>
                    <div className="showtimes-list">
                      {shows.map(show => (
                        <button 
                          key={show.showId}
                          className="time-btn"
                          onClick={() => navigate(`/shows/${show.showId}/seats`)}
                        >
                          {show.time.substring(0, 5)}
                          <span className="tooltip">{show.format}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
