import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getCurrentUser from '../../state/queries/current_user_query';

export default WrappedComponent => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.loading && !nextProps.data.currentUser) {
        this.props.history.push('/login');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return graphql(getCurrentUser)(RequireAuth);
}
