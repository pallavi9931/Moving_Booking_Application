import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getShowSeatsUseCase, getMovieDetailsUseCase, lockSeatsUseCase } from "../../core/di";
import { ChevronLeft, Info, Calendar, MapPin } from "lucide-react";

function formatShowTimeLabel(time) {
  if (!time || typeof time !== "string") return "";
  if (time.includes("T")) {
    const part = time.split("T")[1] || "";
    return part.slice(0, 5);
  }
  return time.slice(0, 5);
}

export default function SeatLayout() {
  const { showId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movieIdFromNav = location.state?.movieId;
  const theatreName = location.state?.theatreName || "Theatre";
  const showTime = location.state?.showTime || "";

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState(null);

  const loadSeats = useCallback(() => {
    if (!showId) return Promise.resolve();
    return getShowSeatsUseCase.execute(showId).then((seatRes) => {
      setSeats(seatRes.seats);
    });
  }, [showId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!showId) return undefined;

    let cancelled = false;
    const mid = movieIdFromNav || "1";
    Promise.all([
      loadSeats(),
      getMovieDetailsUseCase.execute(mid)
    ])
      .then(([, movieRes]) => {
        if (!cancelled) {
          setMovie(movieRes);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Failed to load show details.");
          setLoading(false);
        }
      });

    const poll = setInterval(() => {
      loadSeats().catch(() => {});
    }, 4000);

    return () => {
      cancelled = true;
      clearInterval(poll);
    };
  }, [showId, movieIdFromNav, loadSeats]);

  const toggleSeat = (seat) => {
    if (seat.status !== "AVAILABLE") return;
    if (selectedSeats.includes(seat.seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seat.seatId));
    } else {
      setSelectedSeats((prev) => [...prev, seat.seatId]);
    }
  };

  const seatPrice = seats[0]?.price || 300;

  const seatKey = (id) => String(id);

  const isHeldStatus = (status) => {
    const u = String(status || "").toUpperCase();
    return u === "BOOKED" || u === "LOCKED";
  };

  const areSelectedSeatsLocked = (seatList) => {
    const byId = new Map(seatList.map((s) => [seatKey(s.seatId), s.status]));
    return selectedSeats.every((id) => isHeldStatus(byId.get(seatKey(id))));
  };

  const proceedToCheckout = async () => {
    if (selectedSeats.length === 0 || !showId) return;
    if (booking) return;
    setError(null);
    setBooking(true);
    try {
      const result = await lockSeatsUseCase.execute(showId, selectedSeats);
      if (result?.timeout) {
        setError("Checking booking status…");
        let seatRes;
        try {
          seatRes = await getShowSeatsUseCase.execute(showId);
        } catch (e) {
          if (e?.timeout) {
            setError("Booking is taking longer than expected. Please wait and try again.");
            await loadSeats();
            return;
          }
          setError("Could not verify your seats. Try again.");
          await loadSeats();
          return;
        }
        setSeats(seatRes.seats);
        if (areSelectedSeatsLocked(seatRes.seats)) {
          setError(null);
          await loadSeats();
          sessionStorage.setItem("showId", showId);
          sessionStorage.setItem("seatIds", JSON.stringify(selectedSeats));
          sessionStorage.setItem("movieTitle", movie?.title || "");
          navigate("/checkout");
        } else {
          setError(
            "Booking is taking longer than expected. Please wait and check the seat map before trying again."
          );
          await loadSeats();
        }
        return;
      }

      await loadSeats();
      sessionStorage.setItem("showId", showId);
      sessionStorage.setItem("seatIds", JSON.stringify(selectedSeats));
      sessionStorage.setItem("movieTitle", movie?.title || "");
      navigate("/checkout");
    } catch (e) {
      if (e?.timeout) {
        setError("Booking is taking longer than expected. Please wait…");
        await loadSeats();
        return;
      }
      setError(
        typeof e?.error === "string" && e.error.length
          ? e.error
          : "Could not lock seats. Try again."
      );
      await loadSeats();
    } finally {
      setBooking(false);
    }
  };

  if (loading && seats.length === 0)
    return (
      <div className="flex-center" style={{ height: "80vh" }}>
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
              <h2 className="movie-title-short">{movie?.title || "Loading..."}</h2>
              <div className="show-meta-short">
                <span>
                  <MapPin size={14} /> {theatreName}
                </span>
                <span className="dot"></span>
                <span>
                  <Calendar size={14} /> {formatShowTimeLabel(showTime)}
                </span>
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
            <div className="screen-glow" style={{ boxShadow: "0 -20px 60px rgba(16, 185, 129, 0.3)" }}></div>
            <div
              className="screen-curve"
              style={{
                borderColor: "var(--accent-lime)",
                color: "var(--accent-lime)",
                textShadow: "0 0 10px rgba(163, 230, 53, 0.5)"
              }}
            >
              ROYALE STAGE
            </div>
          </div>

          <div className="seats-grid">
            {seats.map((seat) => {
              const isSelected = selectedSeats.includes(seat.seatId);
              const isLocked = seat.status === "LOCKED" || seat.status === "BOOKED";
              return (
                <button
                  key={seat.seatId}
                  type="button"
                  className={`seat-item ${seat.status.toLowerCase()} ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seat)}
                  disabled={isLocked}
                  title={`Seat ${seat.seatId} - ₹${seat.price}`}
                >
                  <span className="seat-label">{seat.seatId}</span>
                </button>
              );
            })}
          </div>

          <div className="seat-legend flex-center gap-12 mt-16">
            <div className="legend-item">
              <span className="dot available"></span> Available
            </div>
            <div className="legend-item">
              <span className="dot selected"></span> Selected
            </div>
            <div className="legend-item">
              <span className="dot reserved"></span> Locked / Booked
            </div>
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
                  <span className="price-total text-gradient-gold">₹{selectedSeats.length * seatPrice}</span>
                </div>

                {error && (
                  <div className="error-message mb-6 animate-shake">
                    <Info size={16} /> {error}
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-primary full-width btn-lg"
                  onClick={proceedToCheckout}
                  disabled={loading || booking}
                >
                  {booking ? <div className="spinner" /> : "Proceed to Checkout"}
                </button>
              </div>
            ) : (
              <div className="empty-summary flex-center flex-column text-muted py-8">
                <p>Please select seats to continue</p>
              </div>
            )}
          </div>

          <div className="safety-info mt-6 text-muted-small">
            <Info size={14} /> Seats are held for 10 minutes after you proceed to checkout.
          </div>
        </div>
      </div>
    </div>
  );
}
