import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import App from '../view/components/App.js';
import MovieListContainer from '../view/containers/MovieListContainer';
import MovieDetailContainer from '../view/containers/MovieDetailContainer';

const RouterConfig = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MovieListContainer} />
      <Route path="movies/:movieId" component={MovieDetailContainer} />
    </Route>
  </Router>
);

export default RouterConfig;
