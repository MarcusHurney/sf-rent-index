import React, { Component } from 'react';
import PostAuthNavBarContainer from '../../Navigation/containers/PostAuthNavBarContainer';

class MapView extends Component {
  state = {

  }

  renderCurrentUser = () => {
    if (this.props.data.loading) {
      return <h1>Loading</h1>
    } else {
      return <h1>Hello {this.props.data.currentUser.email}</h1>
    }
  }

  render() {
    return (
      <div>
        <PostAuthNavBarContainer />
        
        <div>
          {this.renderCurrentUser()}
        </div>
      </div>
    );
  }
}

export default MapView;
