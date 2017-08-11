import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

import MoviePreviewCard from './MoviePreviewCard';
import SearchBar from './SearchBar';

class MovieList extends Component {
  searchMovies = searchTerm => {
    return _.debounce(term => {
      this.props.updateSearchTerm(term);
    }, 500)(searchTerm);
  }

  renderMovieCards = movies => {
    return movies.map(movie => {
      return (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <MoviePreviewCard movie={movie} />
        </Link>
      );
    });
  }

  renderMovies = () => {
    const { loading, popularMovies, searchMovies } = this.props.data;

    if (!loading && popularMovies) {
      return this.renderMovieCards(popularMovies);
    } else if (!loading && searchMovies) {
      return this.renderMovieCards(searchMovies);
    }
    return <div />;
  }

  render() {
    return (
      <div>
        <SearchBar title={'Explore TMDB'} searchMovies={this.searchMovies} />

        <div className="photo-grid-container">
          <div className="photo-grid">
            {this.renderMovies()}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;
