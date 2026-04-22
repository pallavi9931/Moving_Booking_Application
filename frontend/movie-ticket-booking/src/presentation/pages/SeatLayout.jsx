import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShowSeatsUseCase, getMovieDetailsUseCase } from "../../core/di";
import { Armchair, ChevronLeft, Info, Calendar, MapPin } from "lucide-react";

export default function SeatLayout() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!showId) return;
    Promise.all([
      getShowSeatsUseCase.execute(showId),
      getMovieDetailsUseCase.execute('m1') 
    ]).then(([seatRes, movieRes]) => {
      setSeats(seatRes.seats);
      setMovie(movieRes);
      setLoading(false);
    }).catch(err => {
      setError("Failed to load show details.");
      setLoading(false);
    });
  }, [showId]);

  const toggleSeat = (seat) => {
    if (seat.status !== "AVAILABLE") return;
    if (selectedSeats.includes(seat.seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seat.seatId));
    } else {
      setSelectedSeats((prev) => [...prev, seat.seatId]);
    }
  };

  const proceedToCheckout = async () => {
    if (selectedSeats.length === 0 || !showId) return;
    
    // Skip seat locking as requested - backend will handle this
    sessionStorage.setItem("showId", showId);
    sessionStorage.setItem("seatIds", JSON.stringify(selectedSeats));
    navigate("/checkout");
  };

  if (loading && seats.length === 0) return (
    <div className="flex-center" style={{ height: '80vh' }}>
      <div className="spinner-large"></div>
    </div>
  );

  return (
    <div className="seat-booking-container animate-fade-in">
      
    
      <div className="seat-header glass-navbar">
        <div className="container flex-between">
          <div className="flex align-center gap-4">
            <button className="icon-btn" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} />
            </button>
            <div>
              <h2 className="movie-title-short">{movie?.title || 'Loading...'}</h2>
              <div className="show-meta-short">
                <span><MapPin size={14} /> IMAX Zenith</span>
                <span className="dot"></span>
                <span><Calendar size={14} /> Today, 18:00</span>
              </div>
            </div>
          </div>
          <div className="selected-count hidden-mobile">
            <span className="badge bms-badge-outline">{selectedSeats.length} Seats Selected</span>
          </div>
        </div>
      </div>

      <div className="booking-layout container">
        
    
        <div className="seat-map-section glass-panel p-16">
          <div className="screen-container mb-24">
            <div className="screen-glow" style={{ boxShadow: '0 -20px 60px rgba(16, 185, 129, 0.3)' }}></div>
            <div className="screen-curve" style={{ borderColor: 'var(--accent-lime)', color: 'var(--accent-lime)', textShadow: '0 0 10px rgba(163, 230, 53, 0.5)' }}>ROYALE STAGE</div>
          </div>

          <div className="seats-grid">
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.seatId);
              const isBooked = seat.status === "BOOKED";
              
              return (
                <button
                  key={seat.seatId}
                  className={`seat-item ${seat.status.toLowerCase()} ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seat)}
                  disabled={isBooked}
                  title={`Seat ${seat.seatId} - ₹${seat.price}`}
                >
                  <span className="seat-label">{seat.seatId}</span>
                </button>
              );
            })}
          </div>

          <div className="seat-legend flex-center gap-12 mt-16">
            <div className="legend-item"><span className="dot available"></span> Available</div>
            <div className="legend-item"><span className="dot selected"></span> Selected</div>
            <div className="legend-item"><span className="dot reserved"></span> Reserved</div>
          </div>
        </div>

        
        <div className="booking-summary-panel">
          <div className="glass-panel p-12">
            <h3 className="section-subtitle mb-10">Booking Summary</h3>
            
            {selectedSeats.length > 0 ? (
              <div className="summary-content">
                <div className="summary-row flex-between mb-4">
                  <span className="text-muted">Selected Seats:</span>
                  <span className="bold">{selectedSeats.join(", ")}</span>
                </div>
                <div className="summary-row flex-between mb-8">
                  <span className="text-muted">Total Price:</span>
                  <span className="price-total text-gradient-gold">₹{selectedSeats.length * 300}</span>
                </div>
                
                {error && (
                  <div className="error-message mb-6 animate-shake">
                    <Info size={16} /> {error}
                  </div>
                )}

                <button 
                  className="btn btn-primary full-width btn-lg" 
                  onClick={proceedToCheckout}
                  disabled={loading}
                >
                  {loading ? <div className="spinner" /> : "Proceed to Checkout"}
                </button>
              </div>
            ) : (
              <div className="empty-summary flex-center flex-column text-muted py-8">
                <p>Please select seats to continue</p>
              </div>
            )}
          </div>

          <div className="safety-info mt-6 text-muted-small">
            <Info size={14} /> Cancellation is available up to 2 hours before the show. Terms apply.
          </div>
        </div>

      </div>
    </div>
  );
}

