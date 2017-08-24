import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { GridLoader } from 'halogen';
import _ from 'lodash';

import SearchBar from './SearchBar';
import MoviePreviewCard from './MoviePreviewCard';

class MovieList extends Component {
  clearSearch = () => {
    this.props.updateSearchTerm('');
  }

  searchMovies = searchTerm => {
    return _.debounce(term => {
      this.props.updateSearchTerm(term);
    }, 500)(searchTerm);
  }

  renderMovieCards = movies => {
    return movies.map(movie => {
      return (
        <Link key={movie.id} to={`/movies/${movie.id}`} onClick={this.clearSearch}>
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
    return <div><GridLoader className="gridloader" color={'#D8D8D8'}/></div>;
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
