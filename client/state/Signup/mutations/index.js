import gql from 'graphql-tag';

export const signup = gql`
  mutation signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;
