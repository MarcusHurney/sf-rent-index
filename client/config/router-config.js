import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// import Header from '../view/components/Header';
import LoginFormContainer from '../view/Login/containers/LoginFormContainer';
// import SignupFormContainer from '../view/containers/SignupFormContainer';
// import MovieListContainer from '../view/containers/MovieListContainer';
// import MovieDetailContainer from '../view/containers/MovieDetailContainer';
// import Dashboard from '../view/components/Dashboard';
// import requireAuth from '../view/components/requireAuth';

import Home from '../view/Landing/components/Home';

// const RouterConfig = () => (
//   <Router hashType="slash">
//     <div>
//       <Header />
//       <Route exact path="/" component={MovieListContainer} />
//       <Route path="/login" component={LoginFormContainer} />
//       <Route path="/signup" component={SignupFormContainer} />
//       <Route path="/movies/:movieId" component={MovieDetailContainer} />
//       <Route path="/dashboard" component={requireAuth(Dashboard)} />
//     </div>
//   </Router>
// );

const RouterConfig = () => (
  <Router hashType="slash">
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginFormContainer} />
    </div>
  </Router>
);

export default RouterConfig;
