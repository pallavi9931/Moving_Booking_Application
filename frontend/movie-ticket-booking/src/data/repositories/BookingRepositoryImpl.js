import { apiClient } from "../api/apiClient";

class BookingRepositoryImpl {
  async confirmBooking(seatIds, showId) {
    await apiClient.post("/booking/confirm", {
      showId: Number(showId),
      seats: seatIds
    });
    return {
      success: true,
      bookingRefId: `BK-${showId}-${Date.now()}`,
      status: "CONFIRMED",
      tickets: seatIds.map((id) => ({
        seatId: id,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(id)}`
      }))
    };
  }
}

export { BookingRepositoryImpl };
