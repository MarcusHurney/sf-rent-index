import React from 'react';

import keys from '../../../images/keys.svg';
import money_house from '../../../images/money_house.svg';
import navy_map from '../../../images/navy_map.svg';

const Mission = () => (
  <div className="mission_container">
    <div className="header_container">
      <p className="mission_header">Why SF Rent Index?</p>
    </div>

    <div className="columns_container columns">
      <div className="column is-one-third">
        <figure id="keys" className="image is-128x128">
          <img src={keys} alt="orange map icon" />
        </figure>
        <p className="mission_content">
          The rental market in San Francisco is heavily weighted in favor of
          property owners. Prospective tenants are expected to silently accept
          listing prices.
        </p>
      </div>

      <div className="column">
        <figure id="money_house" className="image is-128x128">
          <img src={money_house} alt="orange map icon" />
        </figure>
        <p className="mission_content">
          Without knowing what your neighbors are actually paying, the realator
          has complete leverage over the tenant. Rental prices will always go
          up, but is this the natural behavior of the real estate economy or a
          lack of price transparency?
        </p>
      </div>

      <div className="column">
        <figure id="navy_map" className="image is-128x128">
          <img src={navy_map} alt="orange map icon" />
        </figure>
        <p className="mission_content">
          SF Rent Index is an attempt to give the rental market more price
          transparency without sacraficing the anonimity of its users. Everyone
          benefits if everyone participates.
        </p>
      </div>
    </div>
  </div>
);

export default Mission;
