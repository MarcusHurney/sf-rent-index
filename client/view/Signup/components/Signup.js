import React, { Component } from 'react';
import { Field, Fields, FieldArray } from 'redux-form';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Slider from 'material-ui/Slider';

import moment from 'moment';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import _ from 'lodash';
import axios from 'axios';

const muiTheme = getMuiTheme({
  fontFamily: 'Helvetica',
  palette: {
    primary1Color: '#123466',
    primary2Color: '#123466',
    primary3Color: '#123466',
    canvasColor: '#fff',
    borderColor: '#343434',
    shadowColor: '#343434'
  },
  checkbox: {
    boxColor: '#123466',
    checkedColor: '#ff584c',
    requiredColor: 'red',
    disabledColor: 'red',
    labelColor: '#545760',
    labelDisabledColor: 'red'
  },
  flatButton: {
    color: 'transparent',
    textColor: '#545760'
  },
  menuItem: {
    hoverColor: '#E8E8E8'
  }
});

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      finished: false,
      stepIndex: 0
    };

    this.renderAddressInput = this.renderAddressInput.bind(this);
  }

  handleAddressInput = address => {
    this.setState({ address });
  };

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4
    });
  };

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  };

  onSubmit = data => {
    geocodeByAddress(data.street_address)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        const {
          email,
          street_address,
          bedrooms,
          square_feet,
          total_rent,
          utilities,
          roommates,
          lease_start,
          lease_end,
          perks
        } = data;

        const REQUEST_BODY = {
          email,
          street_address,
          lat_lng: [lat, lng],
          bedrooms,
          square_feet,
          total_rent,
          utilities,
          roommates,
          lease_start: lease_start.toString(),
          lease_end: lease_end.toString(),
          perks
        };

        this.props
          .mutate({
            variables: { ...REQUEST_BODY }
          })
          .then(res => {
            this.props.reset();
            this.setState({ stepIndex: 0 });
          })
          .catch(error => {});
      });
  };

  renderSuggestion = ({ formattedSuggestion }) => {
    return (
      <div>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small>{formattedSuggestion.secondaryText}</small>
      </div>
    );
  };

  renderAddressInput = ({
    input: { onChange, value, onBlur },
    meta: { touched, error }
  }) => {
    const inputProps = {
      value,
      onChange,
      onBlur: () => {
        this.props.touch('street_address');
      },
      type: 'search',
      placeholder: '1580 Gough Street, San Francisco, CA',
      autoFocus: true
    };

    const config = {
      location: new google.maps.LatLng(37.773972, -122.431297),
      radius: 1000,
      types: ['address']
    };

    const cssClasses = {
      root: 'form-group',
      input: 'form-control',
      autocompleteContainer: 'my-autocomplete-container',
      autocompleteItem: 'address_suggestion',
      autocompleteItemActive: 'active_suggestion'
    };

    return (
      <div>
        <PlacesAutocomplete
          id="address_autocomplete"
          inputProps={inputProps}
          classNames={cssClasses}
          options={config}
          debounce={200}
          highlightFirstSuggestion={true}
          autocompleteItem={this.renderSuggestion}
          googleLogo={false}
        />
        <div className="street_error_container">
          {touched && (error && <span className="street_error">{error}</span>)}
        </div>
      </div>
    );
  };

  renderCurrencyInput = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
      <div className="currency_input_container">
        <div>
          <div className="currency_input_wrapper">
            <span className="currency_symbol">$</span>
            <input {...input} placeholder={label} type={type} />
            {touched && (error && <div className="input_error">{error}</div>)}
          </div>
        </div>
      </div>
    );
  };

  renderInputField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => {
    return (
      <div className="input_container">
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched && (error && <div className="input_error">{error}</div>)}
        </div>
      </div>
    );
  };

  renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    ...custom
  }) => {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
      />
    );
  };

  handleSliderUpdates = (input, event, newValue) => {
    input.onChange(newValue);
  };

  formatSliderValues = value => {
    const date = new Date(value);
    return `${moment(date).format('MMMM YYYY')}`;
  };

  renderDateSlider = ({ input, label }) => {
    const startDate = new Date(2015, 0, 1).valueOf();
    const endDate = new Date(2018, 9, 1).valueOf();

    const boundHandleSliderUpdates = this.handleSliderUpdates.bind(null, input);

    return (
      <div className="slider_wrapper">
        <label style={{ fontSize: '1rem' }}>
          {label}:{' '}
          <span className="slider_date">
            {this.formatSliderValues(input.value)}
          </span>
        </label>

        <Slider
          min={startDate}
          max={endDate}
          step={1}
          value={input.value}
          onChange={boundHandleSliderUpdates}
        />
      </div>
    );
  };

  renderPerks = ({ input, meta }) => {
    const listOfPerks = [
      { label: 'gym', value: 'gym' },
      { label: 'security', value: 'security' },
      { label: 'laundry', value: 'laundry' },
      { label: 'pool', value: 'pool' },
      { label: 'view', value: 'view' },
      { label: 'remodeled', value: 'remodeled' }
    ];

    const { name, onChange } = input;
    const { touched, error } = meta;
    const inputValue = input.value;

    const checkboxes = listOfPerks.map(({ label, value }, index) => {
      const handleChange = event => {
        const arr = [...inputValue];
        if (event.target.checked) {
          arr.push(value);
        } else {
          arr.splice(arr.indexOf(value), 1);
        }
        return onChange(arr);
      };

      const checked = inputValue.includes(value);

      return (
        <Checkbox
          key={`${index}-${label}`}
          name={`${name}[${index}]`}
          label={label}
          value={value}
          checked={checked}
          onCheck={handleChange}
        />
      );
    });

    return <div className="checkbox_container">{checkboxes}</div>;
  };

  renderStepActions = step => {
    const { stepIndex } = this.state;
    const { submitting } = this.props;

    if (stepIndex === 5) {
      return (
        <div style={{ margin: '12px 0' }}>
          <button
            className="button is-outlined next_btn"
            type="submit"
            onClick={this.handleNext}
          >
            Submit
          </button>
          <button
            className="button is-outlined back_btn"
            onClick={this.handlePrev}
          >
            Back
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ margin: '12px 0' }}>
          <button
            className="button is-outlined next_btn"
            type="button"
            onClick={this.handleNext}
          >
            Next
          </button>

          {step > 0 && (
            <button
              className="button is-outlined back_btn"
              onClick={this.handlePrev}
            >
              Back
            </button>
          )}
        </div>
      );
    }
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { finished, stepIndex } = this.state;

    return (
      <div className="signup_container">
        <div className="header_container">
          <h2>Contribute Your Rent Info Anonymously</h2>
          <h3 className="under-heading">
            Help bring transparency to San Francisco's rental market
          </h3>
        </div>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper zDepth={1} className="paper_container">
            <div className="stepper_container">
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Stepper
                  id="stepper"
                  activeStep={stepIndex}
                  orientation="vertical"
                >
                  <Step>
                    <StepLabel>Street Address</StepLabel>

                    <StepContent className="step_content">
                      <Field
                        name="street_address"
                        component={this.renderAddressInput}
                      />

                      {this.renderStepActions(0)}
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>Span of Lease</StepLabel>

                    <StepContent className="step_content">
                      <Field
                        label="Start Date"
                        name="lease_start"
                        component={this.renderDateSlider}
                      />

                      <Field
                        label="End Date"
                        name="lease_end"
                        component={this.renderDateSlider}
                      />

                      {this.renderStepActions(1)}
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>Monthly Cost</StepLabel>

                    <StepContent id="monthly_totals" className="step_content">
                      <Field
                        name="total_rent"
                        type="text"
                        component={this.renderCurrencyInput}
                        label="total rent -- Ex. $3000"
                      />

                      <Field
                        name="utilities"
                        type="text"
                        component={this.renderCurrencyInput}
                        label="total utilities (approx) -- Ex. $100"
                      />

                      {this.renderStepActions(2)}
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>Property Details</StepLabel>

                    <StepContent className="step_content">
                      <Field
                        id="bedrooms_selector"
                        name="bedrooms"
                        component={this.renderSelectField}
                        label="bedrooms"
                      >
                        <MenuItem
                          value={0}
                          primaryText="studio"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={1}
                          primaryText="1"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={2}
                          primaryText="2"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={3}
                          primaryText="3"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={4}
                          primaryText="4"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={5}
                          primaryText="5"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={6}
                          primaryText="6"
                          style={{ color: '#545760' }}
                        />
                      </Field>

                      <Field
                        id="roommates_selector"
                        name="roommates"
                        component={this.renderSelectField}
                        label="roommates"
                      >
                        <MenuItem
                          value={0}
                          primaryText="none"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={1}
                          primaryText="1"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={2}
                          primaryText="2"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={3}
                          primaryText="3"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={4}
                          primaryText="4"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={5}
                          primaryText="5"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={6}
                          primaryText="6"
                          style={{ color: '#545760' }}
                        />
                      </Field>

                      <Field
                        id="sqfeet_selector"
                        name="square_feet"
                        component={this.renderSelectField}
                        label="square feet"
                      >
                        <MenuItem
                          value={500}
                          primaryText="500 or less"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={750}
                          primaryText="750"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={1000}
                          primaryText="1000"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={1250}
                          primaryText="1250"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={1500}
                          primaryText="1500"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={1750}
                          primaryText="1750"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={2000}
                          primaryText="2000"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={2250}
                          primaryText="2250"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={2500}
                          primaryText="2500"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={2750}
                          primaryText="2750"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={3000}
                          primaryText="3000"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={3250}
                          primaryText="3250"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={3500}
                          primaryText="3500"
                          style={{ color: '#545760' }}
                        />
                        <MenuItem
                          value={4000}
                          primaryText="4000"
                          style={{ color: '#545760' }}
                        />
                      </Field>
                      {this.renderStepActions(3)}
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>Perks</StepLabel>
                    <StepContent className="step_content">
                      <Field
                        name="perks"
                        label="Perks"
                        component={this.renderPerks}
                      />

                      {this.renderStepActions(4)}
                    </StepContent>
                  </Step>

                  <Step>
                    <StepLabel>
                      How should we contact you when the data's in?
                    </StepLabel>
                    <StepContent className="step_content">
                      <Field
                        name="email"
                        type="email"
                        component={this.renderInputField}
                        label="Email"
                      />
                      {this.renderStepActions(5)}
                    </StepContent>
                  </Step>
                </Stepper>
              </form>
            </div>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Signup;
