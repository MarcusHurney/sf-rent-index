import React, { Component } from 'react';

class CustomHandle extends Component {
  render() {
    return <i {...this.props} className="material-icons handle_icon">location_searching</i>;
  }
}

export default CustomHandle;
