import { UPDATE_MOVIE_SEARCH_TERM } from '../types/MovieListTypes';

export const updateSearchTerm = searchTerm => {
  return {
    type: UPDATE_MOVIE_SEARCH_TERM,
    searchTerm
  };
}
