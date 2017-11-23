import gql from 'graphql-tag';

const getProperties = gql`
  {
    properties {
      id
      street_address
      lat_lng
      lease_start
      lease_end
      total_rent
      utilities
      roommates
      bedrooms
      square_feet
      perks
    }
  }
`;

export default {
  getProperties
};
