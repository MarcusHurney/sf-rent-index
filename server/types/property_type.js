const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

import User from '../models/user';

const PropertyType = new GraphQLObjectType({
  name: 'PropertyType',
  fields: {
    id: { type: GraphQLID },
    lat_lng: { type: new GraphQLList({ type: GraphQLInt }) },
    street_address: { type: GraphQLString },
    bedrooms: { type: GraphQLInt },
    square_feet: { type: GraphQLInt },
    total_rent: { type: GraphQLInt },
    utilities: { type: GraphQLInt },
    roommates: { type: GraphQLInt },
    lease_start: { type: GraphQLInt },
    lease_end: { type: GraphQLInt },
    perks: { type: new GraphQLList({ type: GraphQLString }) }
    user: {
      type: require('./user_type'),
      resolve(parentValue) {
        return User.findById(parentValue).populate('user')
          .then(user => user)
      }
    }
  }
});

module.exports = PropertyType;
