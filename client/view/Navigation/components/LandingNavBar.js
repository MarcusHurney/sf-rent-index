import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../../state/Common/queries';

class LandingNavBar extends Component {
  state = {
    email: '',
    password: '',
    errors: []
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      // push to MapView component
      this.props.history.push('map');
    }
  }

  handleLogin = ({ email, password }) => {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: getCurrentUser }]
    })
    .then(res => this.setState({ errors: [] }))
    .catch(res => {
      // pulls error messages into an array of strings
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    })
  }

  onSubmit = event => {
    event.preventDefault();

    this.handleLogin(this.state);
  }

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
                  <form onSubmit={this.onSubmit}>
                    <div className="input-field">
                      <input
                        id="email"
                        type="email"
                        className="validate"
                        value={this.state.email}
                        onChange={e => this.setState({ email: e.target.value })}
                      />
                      <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-field">
                      <input
                        id="password"
                        type="password"
                        className="validate"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value})}
                      />
                      <label htmlFor="password">Password</label>
                    </div>

                    <div className="errors">
                      {this.state.errors.map(error => <p key={error}>{error}</p>)}
                    </div>

                    <button className="btn">Submit</button>
                  </form>
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
