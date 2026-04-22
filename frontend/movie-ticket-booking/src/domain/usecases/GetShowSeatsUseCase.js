class GetShowSeatsUseCase {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  inventoryRepository;
  async execute(showId) {
    return this.inventoryRepository.getShowSeats(showId);
  }
}
export {
  GetShowSeatsUseCase
};
