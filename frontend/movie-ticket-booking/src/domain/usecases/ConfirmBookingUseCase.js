class ConfirmBookingUseCase {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }
  bookingRepository;
  async execute(seatIds, showId) {
    return this.bookingRepository.confirmBooking(seatIds, showId);
  }
}
export {
  ConfirmBookingUseCase
};
