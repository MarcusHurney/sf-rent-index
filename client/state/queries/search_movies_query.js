import gql from 'graphql-tag';

export const searchMoviesQuery = gql`
  query SearchMovies($movieTitle: String!, $page: Int) {
     searchMovies (movieTitle: $movieTitle, page: $page) {
       id
       title
       vote_count
     }
   }
`;

export const searchMoviesOptions = {
  skip: ({ searchTerm }) => searchTerm.length < 2,
  options: ({ searchTerm }) => ({
    notifyOnNetworkStatusChange: false,
    variables: { movieTitle: searchTerm, page: 1  }
  })
};
