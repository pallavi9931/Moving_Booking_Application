class LockSeatsUseCase {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  inventoryRepository;
  async execute(showId, seatIds, userId) {
    return this.inventoryRepository.lockSeats(showId, seatIds, userId);
  }
}
export {
  LockSeatsUseCase
};
