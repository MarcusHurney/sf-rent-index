const graphql = require('graphql');
const UserType = require('./user_type');
const API_CONFIG = require('../../client/config/api-config.js');

const { GraphQLObjectType } = graphql;

const { API_KEY } = API_CONFIG;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    currentUser: {
      type: UserType,
      resolve(parentValue, args, { user }) {
        return user;
      }
    }
  }
});

module.exports = RootQueryType;
