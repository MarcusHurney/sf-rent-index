import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.png';
import { getCurrentUser } from '../../../state/Common/queries';

class LandingNavBar extends Component {
  state = {
    email: '',
    password: '',
    errors: []
  };

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      // push to MapView component
      this.props.history.push('map');
    }
  }

  handleLogin = ({ email, password }) => {
    this.props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query: getCurrentUser }]
      })
      .then(res => this.setState({ errors: [] }))
      .catch(res => {
        // pulls error messages into an array of strings
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  onSubmit = event => {
    event.preventDefault();

    this.handleLogin(this.state);
  };

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img
              src={logo}
              alt="San Francisco Rent Index"
              width="150"
              height="52"
            />
          </Link>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <button className="button ">
                <span>Contribute</span>
                <i id="hor" />
                <i id="vert" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default LandingNavBar;
