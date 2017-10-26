import React from 'react';

import orange_hand from '../../../images/orange_hand.svg';
import grey_neighbors from '../../../images/grey_neighbors.svg';
import navy_map from '../../../images/navy_map.svg';

const Mission = () => (
  <div className="mission_container">
    <p className="mission_header">Why SF Rent Index?</p>
    <div className="columns_container columns">
      <div className="column is-one-third">
        <figure className="image is-128x128">
          <img src={orange_hand} alt="orange map icon" />
        </figure>
        <p className="mission_content">
          The real estate game in San Francisco is heavily weighted in favor of
          property owners.
        </p>
      </div>

      <div className="column">
        <figure className="image is-128x128">
          <img src={grey_neighbors} alt="orange map icon" />
        </figure>
        <p className="mission_content">
          Without knowledge of what other people in a neighborhood or an
          apartment are paying, the owner has complete leverage over the tenant.
        </p>
      </div>

      <div className="column">
        <figure className="image is-128x128">
          <img src={navy_map} alt="orange map icon" />
        </figure>
        <p className="mission_content">
          SF Rent Index is an attempt to make the rental market more transparent
          without sacraficing the anonimity of tenants.
        </p>
      </div>

      {/* <div className="column">
        <figure className="image is-128x128">
          <img src={navy_map} alt="orange map icon" />
        </figure>
      </div> */}
    </div>
  </div>
);

export default Mission;
