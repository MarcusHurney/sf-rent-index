import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RouterConfig from './config/router-config';
import client from './config/apollo-config';
import store from './config/store-config';

const Root = () => {
  return (
    <ApolloProvider client={client} store={store}>
      <MuiThemeProvider>
        <RouterConfig />
      </MuiThemeProvider>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
