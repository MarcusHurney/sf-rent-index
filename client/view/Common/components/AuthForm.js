import React, { Component } from 'react';

class AuthForm extends Component {
  state = { email: '', password: '' }

  onSubmit = event => {
    event.preventDefault();

    this.props.handleSubmit(this.state);
  }

  render() {
    return (
      <div className="auth_form_container">

        <p>{this.props.title}</p>

        <form className="auth_form" onSubmit={this.onSubmit}>
          <div className="auth_email_container">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>

          <div className="auth_password_container">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value})}
            />
          </div>

          <div className="errors">
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>

          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
