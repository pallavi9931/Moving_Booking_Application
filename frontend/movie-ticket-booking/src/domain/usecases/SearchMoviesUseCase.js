class SearchMoviesUseCase {
  constructor(searchRepository) {
    this.searchRepository = searchRepository;
  }
  searchRepository;
  async execute(query, date, city) {
    return this.searchRepository.searchMoviesAndShows(query, date, city);
  }
}
export {
  SearchMoviesUseCase
};
