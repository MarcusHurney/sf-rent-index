import React, { Component } from 'react';
import LandingNavBar from '../../Navigation/components/LandingNavBar';
import AuthForm from '../../Common/components/AuthForm';
import { getCurrentUser } from '../../../state/Common/queries';

class LoginForm extends Component {
  state = { errors: [] }

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      // push to dashboard
      // this.props.history.push('/dashboard');
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

  render() {
    return (
      <div className="login_route_container">
        <LandingNavBar />

        <div className="login_form_container">
          <AuthForm
            title={'Login'}
            errors={this.state.errors}
            handleSubmit={this.handleLogin}
          />
        </div>
      </div>
    );
  }
}

export default LoginForm;
