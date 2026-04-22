const getMockState = () => JSON.parse(localStorage.getItem("mock_seats") || "{}");
const setMockState = (state) => localStorage.setItem("mock_seats", JSON.stringify(state));
class InventoryRepositoryImpl {
  async getShowSeats(showId) {
    let state = getMockState();
    if (!state[showId]) {
      state[showId] = Array.from({ length: 40 }, (_, i) => ({
        seatId: `A${i + 1}`,
        status: "AVAILABLE",
        price: 300
      }));
      setMockState(state);
    }
    let changed = false;
    const now = Date.now();
    state[showId].forEach((seat) => {
      if (seat.status === "LOCKED" && seat.lockExpiry && now > seat.lockExpiry) {
        seat.status = "AVAILABLE";
        seat.lockExpiry = null;
        seat.lockedBy = null;
        changed = true;
      }
    });
    if (changed) setMockState(state);
    return { showId, seats: state[showId] };
  }
  async lockSeats(showId, seatIds, userId) {
    let state = getMockState();
    let seats = state[showId] || [];
    const conflict = seats.some((s) => seatIds.includes(s.seatId) && s.status !== "AVAILABLE");
    if (conflict) {
      return { success: false, error: "SEATS_ALREADY_LOCKED", message: "One or more selected seats are no longer available." };
    }
    const lockToken = "lock_" + Date.now();
    seats.forEach((s) => {
      if (seatIds.includes(s.seatId)) {
        s.status = "LOCKED";
        s.lockedBy = userId;
        s.lockToken = lockToken;
        s.lockExpiry = Date.now() + 10 * 60 * 1e3;
      }
    });
    setMockState(state);
    return { success: true, lockToken, expiresIn: 600, message: "Seats successfully locked." };
  }
  async releaseLock(lockToken) {
    let state = getMockState();
    for (const showId in state) {
      state[showId].forEach((s) => {
        if (s.lockToken === lockToken && s.status === "LOCKED") {
          s.status = "AVAILABLE";
          s.lockToken = null;
          s.lockExpiry = null;
        }
      });
    }
    setMockState(state);
    return true;
  }
}
export {
  InventoryRepositoryImpl
};
