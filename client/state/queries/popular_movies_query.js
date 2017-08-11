import gql from 'graphql-tag';

export const popularMoviesQuery = gql`
  query PopularMovies($page: Int) {
    popularMovies(page: $page) {
      id
      title
      vote_count
    }
  }
`;

export const popularMoviesOptions = {
  skip: ({ searchTerm }) => searchTerm.length >= 2,
  options: {
    notifyOnNetworkStatusChange: false,
    variables: { page: 1  }
  }
};
