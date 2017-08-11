import ApolloClient from 'apollo-client';

export default new ApolloClient({
  dataIdFromObject: o => o.id
});
