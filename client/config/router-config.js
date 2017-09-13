import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// import containers/components for routing
import Home from '../view/Landing/components/Home';
import SignupContainer from '../view/Signup/containers/SignupContainer';
import MapViewContainer from '../view/Map/containers/MapViewContainer';

const RouterConfig = () => (
  <Router hashType="slash">
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignupContainer} />
      <Route path="/map" component={MapViewContainer} />
    </div>
  </Router>
);

export default RouterConfig;
