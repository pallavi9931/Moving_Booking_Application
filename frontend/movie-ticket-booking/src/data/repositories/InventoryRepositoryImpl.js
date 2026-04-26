import { apiClient } from "../api/apiClient";

class InventoryRepositoryImpl {
  async getShowSeats(showId) {
    const list = await apiClient.get(`/shows/${showId}/seats`);
    const seats = list.map((s) => ({
      seatId: s.seatNumber,
      status: s.status,
      price: s.price != null ? s.price : 300
    }));
    return { showId, seats };
  }

  async lockSeats(showId, seatIds) {
    const res = await apiClient.post("/booking", {
      showId: Number(showId),
      seats: seatIds
    });
    if (res && res.timeout === true) {
      return { timeout: true };
    }
    return { success: true, message: "Seats locked." };
  }

  async releaseLock() {
    return true;
  }
}

export { InventoryRepositoryImpl };
