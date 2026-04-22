import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetailsUseCase, searchMoviesUseCase } from '../../core/di';
import { Play, Star, Clock, Calendar, Ticket, ChevronLeft, Share2, Heart } from 'lucide-react';

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      getMovieDetailsUseCase.execute(movieId),
      searchMoviesUseCase.execute()
    ]).then(([movieData, searchData]) => {
      setMovie(movieData);
      setShows(searchData.shows || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [movieId]);

  if (loading) return (
    <div className="flex-center" style={{ height: '80vh' }}>
      <div className="spinner-large"></div>
    </div>
  );

  if (!movie) return (
    <div className="flex-center flex-column" style={{ height: '80vh' }}>
      <h2 className="text-gradient mb-4">Movie not found</h2>
      <button className="btn btn-outline" onClick={() => navigate('/')}>Go Back Home</button>
    </div>
  );

  return (
    <div className="movie-details-container animate-fade-in">
      
  
      <div className="detail-hero">
        <div className="backdrop-wrapper">
          <img src={movie.backdropUrl} alt="" className="backdrop-img" />
          <div className="backdrop-overlay"></div>
        </div>

        <div className="detail-content-wrapper">
          <div className="detail-header-actions">
            <button className="icon-btn glass" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-4">
              <button className="icon-btn glass" onClick={() => setIsFavorite(!isFavorite)}>
                <Heart size={20} fill={isFavorite ? "var(--accent)" : "none"} color={isFavorite ? "var(--accent)" : "currentColor"} />
              </button>
              <button className="icon-btn glass">
                <Share2 size={20} />
              </button>
            </div>
          </div>

          <div className="detail-main-info">
            <div className="detail-poster hidden-mobile animate-slide-up">
              <img src={movie.thumbnailUrl} alt={movie.title} />
              <button className="play-trailer-btn flex-center">
                <Play size={48} fill="currentColor" />
              </button>
            </div>

            <div className="detail-text-info">
            <div className="flex align-center gap-4 mb-4">
              <span className="badge bms-badge">PREMIUM FORMAT</span>
              <span className="badge bms-badge-outline">{movie.genre}</span>
            </div>
              
            <h1 className="detail-title text-gradient-gold" style={{ fontSize: '4.5rem', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>{movie.title}</h1>
              
              <div className="detail-meta gap-8">
                <div className="meta-item">
                  <Star className="text-warning" size={20} fill="currentColor" />
                  <span className="bold">{movie.rating}</span>
                  <span className="text-muted">/10</span>
                </div>
                <div className="meta-item">
                  <Clock size={18} /> {movie.duration}
                </div>
                <div className="meta-item">
                  <Calendar size={18} /> {movie.releaseDate}
                </div>
              </div>

              <p className="detail-description animate-fade-in delay-200">
                {movie.description}
              </p>

              <div className="cast-section mt-16 mb-12">
                <h4 className="section-subtitle">Top Cast</h4>
                <div className="cast-list gap-8">
                  {movie.cast.map(name => (
                    <div key={name} className="cast-item">
                      <div className="cast-avatar">
                        <img src={`https://ui-avatars.com/api/?name=${name}&background=0D1117&color=fff&bold=true`} alt={name} />
                      </div>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="booking-section container mt-20 pb-32 animate-slide-up delay-300">
        <div className="glass-panel p-12 mt-n16 relative z-10">
          <div className="section-header flex-between mb-8">
            <div>
              <h2 className="section-title text-gradient">Book Your Tickets</h2>
              <p className="text-muted">Select a showtime to choose your seats</p>
            </div>
            <div className="date-picker hidden-mobile">
              {['Today', 'Tomorrow', '23 Apr', '24 Apr'].map((day, i) => (
                <button key={day} className={`pill-btn ${i===0 ? 'active' : ''}`}>{day}</button>
              ))}
            </div>
          </div>

          <div className="theatre-showtimes mt-16">
            <div className="theatre-card mb-16">
              <div className="theatre-header flex align-center gap-4 mb-4">
                <Ticket className="text-primary" size={24} />
                <h3 className="theatre-name" style={{ fontSize: '1.5rem' }}>ROYALE CINEMAS - IMAX</h3>
              </div>
              
              <div className="showtimes-grid">
                {shows.map(show => (
                  <button 
                    key={show.showId}
                    className="big-time-btn"
                    onClick={() => navigate(`/shows/${show.showId}/seats`)}
                  >
                    <span className="time">{show.time.substring(0, 5)}</span>
                    <span className="format text-muted">{show.format}</span>
                    <span className="price text-accent">From ₹300</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
