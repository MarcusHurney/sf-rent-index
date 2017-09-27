const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} = graphql;

// const UserType = require('./user_type');
const User = require('../models/user');

const PropertyType = new GraphQLObjectType({
  name: 'PropertyType',
  fields: () => ({
      id: { type: GraphQLID },
      lat_lng: { type: new GraphQLList(GraphQLFloat) },
      street_address: { type: GraphQLString },
      bedrooms: { type: GraphQLInt },
      square_feet: { type: GraphQLInt },
      total_rent: { type: GraphQLInt },
      utilities: { type: GraphQLInt },
      roommates: { type: GraphQLInt },
      lease_start: { type: GraphQLString },
      lease_end: { type: GraphQLString },
      perks: { type: new GraphQLList(GraphQLString) },
      user: {
        type: require('./user_type'),
        resolve(parentValue) {
          return User.findById(parentValue).populate('user')
            .then(user => user)
        }
      }
    })
});

module.exports = PropertyType;
