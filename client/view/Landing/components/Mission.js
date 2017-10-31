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
      <div className="column">
        <div className="card">
          <div className="card-image">
            <figure id="keys" className="image is-128x128">
              <img src={keys} alt="orange map icon" />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="has-text-centered">Leverage</p>
              </div>
            </div>

            <div className="content">
              <p className="mission_content">
                The rental market in San Francisco is heavily weighted in favor
                of property owners. Prospective tenants are expected to silently
                accept listing prices.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <div className="card-image">
            <figure id="money_house" className="image is-128x128">
              <img src={money_house} alt="orange map icon" />
            </figure>
          </div>

          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="has-text-centered">Insight</p>
              </div>
            </div>

            <div className="content">
              <p className="mission_content">
                Without knowing what your neighbors are actually paying, the
                realator has complete leverage over the tenant. Are forever
                rising rent prices the result of little to no price
                transparency?
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="column">
        <div className="card">
          <div className="card-image">
            <figure id="navy_map" className="image is-128x128">
              <img src={navy_map} alt="orange map icon" />
            </figure>
          </div>

          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="has-text-centered">Transparency</p>
              </div>
            </div>

            <div className="content">
              <p className="mission_content">
                SF Rent Index is an attempt to foster price transparency in San
                Francisco's rental market without sacraficing the anonimity of
                its users. Everyone benefits if everyone participates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Mission;
