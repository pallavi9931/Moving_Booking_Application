class ReleaseLockUseCase {
  constructor(inventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  inventoryRepository;
  async execute(lockToken) {
    return this.inventoryRepository.releaseLock(lockToken);
  }
}
export {
  ReleaseLockUseCase
};
