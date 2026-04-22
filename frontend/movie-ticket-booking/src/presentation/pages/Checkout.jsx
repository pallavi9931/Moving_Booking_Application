import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmBookingUseCase } from "../../core/di";
import { ShieldCheck, Ticket, CreditCard, ChevronLeft } from "lucide-react";

export default function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const showId = sessionStorage.getItem("showId");
  const seatIds = JSON.parse(sessionStorage.getItem("seatIds") || "[]");

  useEffect(() => {
    if (seatIds.length === 0) {
      navigate("/");
      return;
    }
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    try {
      
      // Mock payment delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await confirmBookingUseCase.execute(seatIds, showId, "pay_mock_1234");
      if (res && res.success) {
        sessionStorage.setItem("bookingResult", JSON.stringify(res));
        navigate("/dashboard");
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      alert("System error during payment.");
      navigate(`/shows/${showId}/seats`);
    }
  };

  return (
    <div className="checkout-container animate-fade-in container pb-16">
      <div className="flex align-center gap-4 mb-8 pt-8">
        <button className="icon-btn glass" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
        </button>
        <h1 className="section-title mb-0">Secure Checkout</h1>
      </div>

      <div className="checkout-layout mt-12 gap-12">
        
      
        <div className="order-details-col">
          <div className="glass-panel p-12 mb-16">
            <h3 className="section-subtitle mb-10 flex align-center gap-2">
              <Ticket size={18} className="text-primary" /> Order Summary
            </h3>
            
            <div className="summary-item flex-between mb-4">
              <span className="text-muted">Movie</span>
              <span className="bold">Apex Legends: The Movie</span>
            </div>
            <div className="summary-item flex-between mb-4">
              <span className="text-muted">Seats</span>
              <span className="bold text-primary">{seatIds.join(", ")}</span>
            </div>
            <div className="summary-item flex-between mb-6">
              <span className="text-muted">Base Price</span>
              <span className="bold">₹{seatIds.length * 300}</span>
            </div>
            
            <div className="total-divider mb-6"></div>
            
            <div className="total-row flex-between mb-2">
              <span className="bold text-xl">Total Payable</span>
              <span className="bold text-2xl text-gradient-gold">₹{seatIds.length * 300}</span>
            </div>
            <p className="text-muted-small mt-2">Inclusive of all taxes and fees</p>
          </div>

          <div className="glass-panel p-10 flex align-center gap-8 bg-premium-success" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
            <ShieldCheck className="text-success" size={32} />
            <div>
              <p className="bold mb-0">Verified Booking</p>
              <p className="text-muted-small mb-0">Your tickets will be sent to your email instantly after payment.</p>
            </div>
          </div>
        </div>

        
        <div className="payment-col">
          <div className="glass-panel p-12 text-center sticky-top">
            <h3 className="section-subtitle mb-8">Payment Options</h3>

            <div className="payment-options mb-12">
              <button className="payment-method active p-6">
                <CreditCard size={20} />
                <span>Credit / Debit Card</span>
              </button>
            </div>

            <button 
              className="btn btn-primary full-width btn-lg mb-4" 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner mr-2" />
                  Processing...
                </>
              ) : (
                <>Pay ₹{seatIds.length * 300}</>
              )}
            </button>
            
            <p className="text-muted-small">
              By clicking "Pay", you agree to our Terms & Conditions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
