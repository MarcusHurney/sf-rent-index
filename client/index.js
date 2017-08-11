import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { ApolloProvider } from 'react-apollo';

import RouterConfig from './config/router-config';
import client from './config/apollo-config';
import store from './config/store-config';

const Root = () => {
  return (
    <ApolloProvider client={client} store={store}>
      <RouterConfig />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
