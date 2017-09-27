const graphql = require('graphql');
const UserType = require('./user_type');

const { GraphQLObjectType } = graphql;

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
