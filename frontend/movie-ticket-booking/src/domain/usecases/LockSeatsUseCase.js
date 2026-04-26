class LockSeatsUseCase {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  inventoryRepository;
  async execute(showId, seatIds) {
    return this.inventoryRepository.lockSeats(showId, seatIds);
  }
}
export {
  LockSeatsUseCase
};
