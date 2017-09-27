import gql from 'graphql-tag';

export const signup = gql`
  mutation signup($email: String, $password: String) {
    signup(email: $email, password: $password) {
      id
      email
    }
  }
`;

export const signupWithoutPassword = gql`
  mutation signupWithoutPassword
  (
    $email: String!,
    $street_address: String,
    $lat_lng: [Float],
    $bedrooms: Int,
    $square_feet: Int,
    $total_rent: Int,
    $utilities: Int,
    $roommates: Int,
    $lease_start: String,
    $lease_end: String,
    $perks: [String]
  ) {
    signupWithoutPassword
    (
      email: $email,
      street_address: $street_address,
      lat_lng: $lat_lng,
      bedrooms: $bedrooms,
      square_feet: $square_feet,
      total_rent: $total_rent,
      utilities: $utilities,
      roommates: $roommates,
      lease_start: $lease_start,
      lease_end: $lease_end,
      perks: $perks
    ) {
      id
    }
  }
`;
