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
        <a
          href="#register"
          className="waves-effect waves-light btn-large primary_red"
        >
          <i className="material-icons left">rate_review</i>Get Started
        </a>
      </div>
    </div>

    <div className="mission_container">
      <p className="mission_header">Why SF Rent Index?</p>
      <p className="mission_content">
        The real estate game in San Francisco is heavily weighted in favor of
        property owners. Without knowledge of what other people in a
        neighborhood or an apartment are paying, the owner has complete leverage
        over the tenant. SF Rent Index is an attempt to make the rental market
        more transparent without sacraficing the anonimity of tenants.
      </p>
    </div>
  </div>
);

export default Banner;
