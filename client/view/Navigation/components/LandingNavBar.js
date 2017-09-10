import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingNavBar extends Component {
  render() {
    return (
      <div id="landing_navbar_container" className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">

            <Link to='/' className="brand-logo">
              <i id="nav_logo" className="material-icons">map</i>
              <i id="logo_text">SF Rent Map</i>
            </Link>

            <ul className="right collapsible popout" data-collapsible="accordion">
              <li>
                <div className="collapsible-header primary_red">Login</div>

                <div id="login_popout_body" className="collapsible-body">
                  <div className="input-field">
                    <input
                      id="email"
                      type="email"
                      className="validate"
                    />
                    <label for="email">Email</label>
                  </div>

                  <div className="input-field">
                    <input
                      id="password"
                      type="password"
                      className="validate"
                    />
                    <label for="password">Password</label>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </nav>
      </div>
    );
  }
}

export default LandingNavBar;
