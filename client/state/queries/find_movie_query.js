import gql from 'graphql-tag';

export const findMovieQuery = gql`
  query FindMovie($movieId: ID!) {
    findMovie(movieId: $movieId) {
      id
      title
      vote_count
    }
  }
`;

export const findMovieOptions = {
  options: props => ({
    notifyOnNetworkStatusChange: false,
    variables: { movieId: props.params.movieId }
  })
};
