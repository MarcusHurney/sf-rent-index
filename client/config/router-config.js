import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

// import containers/components for routing
import Home from '../view/Landing/components/Home';
import MapViewContainer from '../view/Map/containers/MapViewContainer';

const RouterConfig = () => (
  <Router hashType="slash">
    <div>
      <Route exact path="/" component={Home} />
      {/* <Route path="/map" component={MapViewContainer} /> */}
    </div>
  </Router>
);

export default RouterConfig;
