import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Download, Home, Share2, Ticket, MapPin, Calendar, Clock } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = sessionStorage.getItem("bookingResult");
    if (data) {
      setBooking(JSON.parse(data));
    
      sessionStorage.removeItem("seatIds");
      sessionStorage.removeItem("showId");
    } else {
      navigate("/");
    }
  }, []);

  if (!booking) return null;

  return (
    <div className="dashboard-container container animate-fade-in py-16">
      
      <div className="success-hero text-center mb-24">
        <div className="success-icon-wrapper mb-12 animate-bounce-subtle">
          <CheckCircle size={80} className="text-success" />
        </div>
        <h1 className="success-title text-gradient-gold">Booking Confirmed!</h1>
        <p className="text-muted text-lg">Your cinematic journey starts here. Enjoy the movie!</p>
        <div className="reference-badge card-badge mt-6">
          BOOKING REFERENCE: <span className="text-primary">{booking.bookingRefId}</span>
        </div>
      </div>

      <div className="tickets-grid gap-16">
        {booking.tickets.map((ticket, index) => (
          <div key={ticket.seatId} className="ticket-card-premium animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="ticket-main p-8">
              <div className="ticket-left p-12">
                <div className="movie-tag">CINE RESERVE EXCLUSIVE</div>
                <h3 className="ticket-movie-title">Apex Legends: The Movie</h3>
                <div className="ticket-info-grid">
                  <div className="info-item">
                    <MapPin size={14} /> <span>IMAX Zenith</span>
                  </div>
                  <div className="info-item">
                    <Calendar size={14} /> <span>Today, 21 Apr</span>
                  </div>
                  <div className="info-item">
                    <Clock size={14} /> <span>18:00 (IMAX 3D)</span>
                  </div>
                </div>
                <div className="seat-badge-premium mt-6">
                  <Ticket size={16} /> <span>Seat {ticket.seatId}</span>
                </div>
              </div>
              
              <div className="ticket-divider">
                <div className="notch top"></div>
                <div className="line"></div>
                <div className="notch bottom"></div>
              </div>

              <div className="ticket-right flex-center flex-column">
                <div className="qr-wrapper">
                  <img src={ticket.qrCode} alt="Ticket QR Code" />
                </div>
                <span className="text-muted-small mt-2">Scan at Entry</span>
              </div>
            </div>
            
            <div className="ticket-actions">
              <button className="action-link"><Download size={16} /> Download</button>
              <div className="v-divider"></div>
              <button className="action-link"><Share2 size={16} /> Share</button>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-footer flex-center gap-8 mt-24">
        <button className="btn btn-outline btn-lg flex-center gap-2" onClick={() => navigate("/")}>
          <Home size={20} /> Back to Home
        </button>
        <button className="btn btn-primary btn-lg" onClick={() => window.print()}>
          Print All Tickets
        </button>
      </div>

    </div>
  );
}
