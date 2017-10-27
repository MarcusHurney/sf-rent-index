import React from 'react';

const Banner = () => (
  <div className="banner_container">
    <div className="banner_img_container">
      <div className="hero">See Actual Rent Data Across San Francisco</div>

      <div className="sub_hero">
        Know what others are paying before signing your next lease
        <br />
        Find out if you're paying too much
      </div>

      <div className="call_to_action">
        <button className="button is-medium">
          <i className="material-icons left">rate_review</i>Contribute
        </button>
      </div>
    </div>
  </div>
);

export default Banner;
