import React, { PropTypes } from 'react';

import Rheostat from 'rheostat';
import CustomHandle from './CustomHandle'

class CustomSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values || [0],
    };

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(sliderState) {
    this.setState({
      values: sliderState.values,
    });
  }

  renderValues = () => {
    const { formatValue } = this.props;

    return (
      <div className="slider_values">
        {
          this.state.values.map((value, index) => (
            <div key={value}>
              <label>{index ? 'End' : 'Start'}</label>
              {formatValue ? formatValue(value) : value}
            </div>
          ))
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Rheostat
          {...this.props}
          handle={CustomHandle}
          onValuesUpdated={this.updateValue}
          values={this.state.values}
        />

        {this.renderValues()}
      </div>
    );
  }
}

CustomSlider.propTypes = {
  values: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  formatValue: PropTypes.func,
};

CustomSlider.defaultProps = {
  values: [],
  formatValue: null,
};

export default CustomSlider;
