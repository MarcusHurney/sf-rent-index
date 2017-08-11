import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import gql from 'graphql-tag';
import { findMovieQuery, findMovieOptions } from '../../state/queries/find_movie_query';

class MovieDetail extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>Movie Detail</p>
      </div>
    );
  }
}

export default graphql(findMovieQuery, findMovieOptions)(MovieDetail);
