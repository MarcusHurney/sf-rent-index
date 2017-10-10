import React, { Component } from 'react';
import LandingNavBarContainer from '../../Navigation/containers/LandingNavBarContainer';
import SignupContainer from '../../Signup/containers/SignupContainer';
import Banner from './Banner';
import DemoVid from './DemoVid';
import Testimonials from './Testimonials';

class Home extends Component {
  render() {
    return (
      <div className="home_container">
        <LandingNavBarContainer />
        <Banner />
        <DemoVid />
        <Testimonials />
        <SignupContainer />
      </div>
    );
  }
}

export default Home;
