import React, { Component } from 'react';

import LandingNavBarContainer from '../../Navigation/containers/LandingNavBarContainer';
import SignupContainer from '../../Signup/containers/SignupContainer';

import Banner from './Banner';
import Mission from './Mission';
import DemoMapContainer from '../containers/DemoMapContainer';
import Testimonials from './Testimonials';
import WhatToExpect from './WhatToExpect';

class Home extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="home_container">
        <LandingNavBarContainer />
        <Banner />
        <Mission />
        <DemoMapContainer
          initialPosition={{
            lat: 37.7749295,
            lng: -122.41941550000001
          }}
          city={'San Francisco'}
        />
        <Testimonials />
        <WhatToExpect />
        <SignupContainer />
      </div>
    );
  }
}

export default Home;
