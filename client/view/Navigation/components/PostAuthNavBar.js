import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PostAuthNavBar extends Component {
  state = {
    errors: []
  }

  handleLogout = () => {
    this.props.mutate()
    .then(res => {
      this.props.history.push('/');
    }).catch(res => {
      // pulls error messages into an array of strings
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render() {
    return (
      <div id="postauth_navbar_container" className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">
            <Link to='/' className="brand-logo">
              <i id="nav_logo" className="material-icons">map</i>
              <i id="logo_text">SF Rent Map</i>
            </Link>

            <ul className="right hide-on-med-and-down">
              <li>
                <button className="btn waves-effect waves-light" onClick={this.handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default PostAuthNavBar;
