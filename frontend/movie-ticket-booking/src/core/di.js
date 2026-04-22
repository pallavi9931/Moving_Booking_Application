import { SearchRepositoryImpl } from "../data/repositories/SearchRepositoryImpl";
import { InventoryRepositoryImpl } from "../data/repositories/InventoryRepositoryImpl";
import { BookingRepositoryImpl } from "../data/repositories/BookingRepositoryImpl";
import { SearchMoviesUseCase } from "../domain/usecases/SearchMoviesUseCase";
import { GetMovieDetailsUseCase } from "../domain/usecases/GetMovieDetailsUseCase";
import { GetShowSeatsUseCase } from "../domain/usecases/GetShowSeatsUseCase";
import { LockSeatsUseCase } from "../domain/usecases/LockSeatsUseCase";
import { ConfirmBookingUseCase } from "../domain/usecases/ConfirmBookingUseCase";
import { ReleaseLockUseCase } from "../domain/usecases/ReleaseLockUseCase";
const searchRepository = new SearchRepositoryImpl();
const inventoryRepository = new InventoryRepositoryImpl();
const bookingRepository = new BookingRepositoryImpl();
const searchMoviesUseCase = new SearchMoviesUseCase(searchRepository);
const getMovieDetailsUseCase = new GetMovieDetailsUseCase(searchRepository);
const getShowSeatsUseCase = new GetShowSeatsUseCase(inventoryRepository);
const lockSeatsUseCase = new LockSeatsUseCase(inventoryRepository);
const confirmBookingUseCase = new ConfirmBookingUseCase(bookingRepository);
const releaseLockUseCase = new ReleaseLockUseCase(inventoryRepository);
export {
  confirmBookingUseCase,
  getShowSeatsUseCase,
  lockSeatsUseCase,
  releaseLockUseCase,
  searchMoviesUseCase,
  getMovieDetailsUseCase
};
