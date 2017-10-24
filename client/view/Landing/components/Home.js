import React, { Component } from 'react';
import LandingNavBarContainer from '../../Navigation/containers/LandingNavBarContainer';
import SignupContainer from '../../Signup/containers/SignupContainer';
import Banner from './Banner';
import DemoMap from './DemoMap';
import Testimonials from './Testimonials';

class Home extends Component {
  render() {
    return (
      <div className="home_container">
        <LandingNavBarContainer />
        <Banner />
        <DemoMap
          initialPosition={{
            lat: 37.7749295,
            lng: -122.41941550000001
          }}
          city={'San Francisco'}
        />
        <Testimonials />
        <SignupContainer />
      </div>
    );
  }
}

export default Home;
