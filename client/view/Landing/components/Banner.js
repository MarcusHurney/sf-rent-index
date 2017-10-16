import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => (
  <div className="banner_container">
    <div className="banner_img_container" />

    <div className="hero_container">
      <div className="hero">See Anonymous Rent Data Across San Francisco</div>

      <div className="sub_hero">
        Know what others are paying before signing your next lease
      </div>

      <div className="call_to_action">
        <Link to="/" className="waves-effect waves-light btn-large primary_red">
          <i className="material-icons left">mode_edit</i>Get Started
        </Link>
      </div>
    </div>
  </div>
);

export default Banner;
