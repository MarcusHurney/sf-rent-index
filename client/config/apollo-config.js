import ApolloClient, { createNetworkInterface } from 'apollo-client';

// 'same-origin' tells Apollo it is safe to send along cookies with
// all requests to the graphql server
const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

export default new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});
