const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} = graphql;

const UserType = require('../types/user_type');
const PropertyType = require('../types/property_type');
const AuthService = require('../services/auth_service');
const PropertyService = require('../services/property_service');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    signupWithoutPassword: {
      type: PropertyType,
      args: {
        email: { type: GraphQLString },
        street_address: { type: GraphQLString },
        lat_lng: { type: new GraphQLList(GraphQLFloat) },
        bedrooms: { type: GraphQLInt },
        square_feet: { type: GraphQLInt },
        total_rent: { type: GraphQLInt },
        utilities: { type: GraphQLInt },
        roommates: { type: GraphQLInt },
        lease_start: { type: GraphQLString },
        lease_end: { type: GraphQLString },
        perks: { type: new GraphQLList(GraphQLString) },
      },
      resolve(parentValue, args, req) {
        return AuthService.signupWithoutPassword({ email: args.email, req })
        .then(user => PropertyService.createProperty({ property_data: args, user_id: user._id }))
        .catch(error => console.log("couldn't create new user account"));
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        return AuthService.logout(req);
      }
    }
  }
});

module.exports = mutation;
