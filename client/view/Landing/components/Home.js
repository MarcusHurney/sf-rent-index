import React, { Component } from 'react';
import LandingNavBarContainer from '../../Navigation/containers/LandingNavBarContainer';
import Banner from './Banner';
import DemoVid from './DemoVid';

class Home extends Component {
  render() {
    return (
      <div className="home_container">
        <LandingNavBarContainer />
        <Banner />
        <DemoVid />
      </div>
    );
  }
}

export default Home;
