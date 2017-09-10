import React, { Component } from 'react';
import LandingNavBar from '../../Navigation/components/LandingNavBar';
import Banner from './Banner';
import DemoVid from './DemoVid';

class Home extends Component {
  render() {
    return (
      <div className="home_container">
        <LandingNavBar />
        <Banner />
        <DemoVid />
      </div>
    );
  }
}

export default Home;
