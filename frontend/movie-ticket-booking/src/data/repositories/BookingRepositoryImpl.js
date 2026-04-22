const getMockState = () => JSON.parse(localStorage.getItem("mock_seats") || "{}");
const setMockState = (state) => localStorage.setItem("mock_seats", JSON.stringify(state));
class BookingRepositoryImpl {
  async confirmBooking(seatIds, showId, paymentId) {
    let state = getMockState();
    let seats = state[showId] || [];
    let bookedSeats = [];
    seats.forEach((s) => {
      if (seatIds.includes(s.seatId)) {
        s.status = "BOOKED";
        s.lockToken = null;
        s.lockExpiry = null;
        bookedSeats.push(s.seatId);
      }
    });
    setMockState(state);
    return {
      success: true,
      bookingRefId: "BK-" + Math.floor(Math.random() * 1e6),
      status: "CONFIRMED",
      tickets: bookedSeats.map((id) => ({ seatId: id, qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${id}` }))
    };
  }
}
export {
  BookingRepositoryImpl
};
