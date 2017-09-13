import React, { Component } from 'react';
import LandingNavBarContainer from '../../Navigation/containers/LandingNavBarContainer';
import SignupContainer from '../../Signup/containers/SignupContainer';
import Banner from './Banner';
import DemoVid from './DemoVid';

class Home extends Component {
  render() {
    return (
      <div className="home_container">
        <LandingNavBarContainer />
        <Banner />
        <DemoVid />
        <SignupContainer />
      </div>
    );
  }
}

export default Home;
