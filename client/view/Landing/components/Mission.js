import React from 'react';

import landlord from '../../../images/landlord.svg';
import light_grey_house from '../../../images/light_grey_house.svg';
import grey_map from '../../../images/grey_map.svg';

const Mission = () => (
  <div className="mission_image_container">
    <div className="mission_container">
      <div className="header_container">
        <h2 className="mission_header">Why SF Rent Index?</h2>
        <div className="bold_header">Price Transparency.</div>
        <p className="sub_bold_header">
          Find out how crowsourced rental data benefits you and your neighbors.
        </p>
      </div>

      <div className="columns_container columns">
        <div className="column">
          <div className="card">
            <div className="card-image">
              <figure id="keys" className="image is-128x128">
                <img src={landlord} alt="orange map icon" />
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
                  The rental market in San Francisco is heavily weighted in
                  favor of property owners. Prospective tenants are expected to
                  silently accept listing prices.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="card-image">
              <figure id="light_grey_house" className="image is-128x128">
                <img src={light_grey_house} alt="orange map icon" />
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
                  rising rent prices the result of poor price transparency?
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <div className="card-image">
              <figure id="grey_map" className="image is-128x128">
                <img src={grey_map} alt="orange map icon" />
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
                  SF Rent Index is an attempt to foster price transparency in
                  San Francisco's rental market without sacraficing the
                  anonimity of its users. Everyone benefits if everyone
                  participates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Mission;
