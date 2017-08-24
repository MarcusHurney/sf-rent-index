import React, { Component } from 'react';
import AuthForm from './AuthForm';
import getCurrentUser from '../../state/queries/current_user_query';

class LoginForm extends Component {
  state = { errors: [] }

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      // push to dashboard
      this.props.history.push('/dashboard');
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
      <div className="container login_form_container">
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          handleSubmit={this.handleLogin}
        />
      </div>
    );
  }
}

export default LoginForm;
