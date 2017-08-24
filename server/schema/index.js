const graphql = require('graphql');
const RootQueryType = require('../types/root_query_type');
const { GraphQLSchema } = graphql;
const mutation = require('../mutations/auth_mutations');

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation,
  graphiql: true
});
