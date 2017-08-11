import { UPDATE_MOVIE_SEARCH_TERM } from '../types/MovieListTypes';

export default (state = { searchTerm: '' }, action) => {
  switch(action.type) {
    case UPDATE_MOVIE_SEARCH_TERM:
      const { searchTerm } = action;
      return { searchTerm };

    default:
      return state;
  }
}
