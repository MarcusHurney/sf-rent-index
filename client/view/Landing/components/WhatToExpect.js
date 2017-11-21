import React from 'react';

const WhatToExpect = () => (
  <div className="expect_container">
    <div className="header_container">
      <h2 className="expect_header">What to Expect</h2>
    </div>

    <div className="expect_content">
      <div className="columns is-mobile is-multiline is-centered">
        <div className="column">
          <div className="circle_connector">
            <div className="step_circle">1</div>
            <div className="line" />
          </div>

          <div className="step_content">
            <h2 className="step_title">Contribute</h2>
            <div className="step_body">
              Enter your rent information below to join our waitlist. In order
              to provide high quality data across San Francisco, all users must
              contribute their most recent lease information. Your data is
              completely anonymous - not tied to you in any way.
            </div>
          </div>
        </div>
        <div className="column">
          <div className="circle_connector">
            <div className="step_circle">2</div>
            <div className="line" />
          </div>
          <div className="step_content">
            <h2 className="step_title">Chill</h2>
            <div className="step_body">
              Every 24 hrs we welcome new people to SF Rent Index. We’ll provide
              an update on where you are at. Feel free to email us at any time -{' '}
              <a href="mailto:hello@sfrentindex.com" target="_blank">
                hello@sfrentindex.com
              </a>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="circle_connector">
            <div className="step_circle">3</div>
            <div className="line_holder" />
          </div>
          <div className="step_content">
            <h2 className="step_title">Enjoy</h2>
            <div className="step_body">
              Once approved, you’ll be able to browse all available rent data
              across San Francisco! New features to inspect property and
              management reviews, comparison tools, and more will be added in
              the near future. We hope it’s helpful!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WhatToExpect;
