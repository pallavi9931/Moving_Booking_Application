class GetMovieDetailsUseCase {
  constructor(searchRepository) {
    this.searchRepository = searchRepository;
  }
  
  async execute(movieId) {
    return this.searchRepository.getMovieDetails(movieId);
  }
}

export { GetMovieDetailsUseCase };
