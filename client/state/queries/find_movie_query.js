import gql from 'graphql-tag';

export const findMovieQuery = gql`
  query FindMovie($movieId: ID!) {
    findMovie(movieId: $movieId) {
      id
      title
      vote_count
      vote_average
      popularity
      poster_path
      backdrop_path
      original_language
      overview
      release_date
      status
      revenue
      budget
      tagline
    }
  }
`;

export const findMovieOptions = {
  options: props => ({
    notifyOnNetworkStatusChange: false,
    variables: { movieId: props.match.params.movieId }
  })
};
