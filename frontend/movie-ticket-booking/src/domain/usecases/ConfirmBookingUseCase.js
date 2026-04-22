class ConfirmBookingUseCase {
  constructor(bookingRepository) {
    this.bookingRepository = bookingRepository;
  }
  bookingRepository;
  async execute(seatIds, showId, paymentId) {
    return this.bookingRepository.confirmBooking(seatIds, showId, paymentId);
  }
}
export {
  ConfirmBookingUseCase
};
