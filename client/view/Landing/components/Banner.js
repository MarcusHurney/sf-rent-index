import React from 'react';

const Banner = () => (
  <div className="banner_container">
    <div className="banner_img_container">
      <div className="hero">See Actual Rent Data Across San Francisco</div>

      <div className="sub_hero">
        <div>Know what others are paying before signing your next lease</div>

        <div>Find out if you're paying too much</div>
      </div>

      <div className="call_to_action">
        <button className="button is-medium">
          <span>Contribute</span>
          <i id="hor" />
          <i id="vert" />
          <div id="circ" />
        </button>
      </div>
    </div>
  </div>
);

export default Banner;
