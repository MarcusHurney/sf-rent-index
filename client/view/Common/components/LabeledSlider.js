import React, { PropTypes } from 'react';

import Rheostat from 'rheostat';

class LabeledSlider extends React.Component {
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

  render() {
    const { formatValue } = this.props;

    return (
      <div
        style={{
          margin: '10% auto',
          height: '50%',
          width: '50%',
        }}
      >
        <Rheostat
          {...this.props}
          onValuesUpdated={this.updateValue}
          values={this.state.values}
        />
        <ul>
          <lh>Values</lh>
          {this.state.values.map(value => (
            <li key={value}>
              {formatValue ? formatValue(value) : value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

LabeledSlider.propTypes = {
  values: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  formatValue: PropTypes.func,
};

LabeledSlider.defaultProps = {
  values: [],
  formatValue: null,
};

export default LabeledSlider;
