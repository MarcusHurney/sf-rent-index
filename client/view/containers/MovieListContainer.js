import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import MovieList from '../components/MovieList';

import { popularMoviesQuery, popularMoviesOptions } from '../../state/queries/popular_movies_query';
import { searchMoviesQuery, searchMoviesOptions } from '../../state/queries/search_movies_query';
import { updateSearchTerm } from '../../state/actions/MovieListActions';

const mapStateToProps = state => {
  return {
    searchTerm: state.movie_list.searchTerm
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateSearchTerm: searchTerm => {
      dispatch(updateSearchTerm(searchTerm));
    }
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(popularMoviesQuery, popularMoviesOptions),
  graphql(searchMoviesQuery, searchMoviesOptions)
)(MovieList);
