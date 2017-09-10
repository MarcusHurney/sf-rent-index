import gql from 'graphql-tag';

export const getCurrentUser = gql`
  {
    currentUser {
      email
    }
  }
`;
