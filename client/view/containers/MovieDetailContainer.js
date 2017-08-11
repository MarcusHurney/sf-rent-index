import { graphql, compose } from 'react-apollo';
import MovieDetail from '../components/MovieDetail';

import { findMovieQuery, findMovieOptions } from '../../state/queries/find_movie_query';

export default graphql(findMovieQuery, findMovieOptions)(MovieDetail);
