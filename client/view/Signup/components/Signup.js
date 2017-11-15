import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Field, Fields, FieldArray } from 'redux-form';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

import { SelectField, Slider } from 'redux-form-material-ui';

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
      stepIndex: 0,
      formError: '',
      formSubmitted: false
    };

    this.renderAddressInput = this.renderAddressInput.bind(this);
  }

  saveRef = ref => (this.ref = ref);

  formatSliderValues = dateValue => {
    const date = new Date(dateValue);
    return `${moment(date).format('MMMM YYYY')}`;
  };

  renderLeaseDate = type => {
    const { initialValues, formValues } = this.props;
    let dateValue;

    if (formValues) {
      dateValue = formValues[type];
    } else {
      dateValue = initialValues[type];
    }

    return this.formatSliderValues(dateValue);
  };

  handleAddressInput = address => {
    this.setState({ address });
  };

  handleNext = () => {
    const { stepIndex } = this.state;

    switch (stepIndex) {
      case 0: {
        if (this.props.formErrors.street_address) {
          return this.setState({
            formError: 'Please enter select a valid street address to continue',
            next_btn_disabled: true
          });
        }
        break;
      }
      case 1: {
        const { lease_start, lease_end } = this.props.formValues;

        if (lease_start === undefined || lease_end === undefined) {
          return this.setState({
            formError:
              'Please select the time span of your most recent lease to continue',
            next_btn_disabled: true
          });
        }
        break;
      }
      case 2: {
        const { total_rent, utilities } = this.props.formValues;

        if (total_rent === undefined || utilities === undefined) {
          return this.setState({
            formError:
              'Please provide the monthly expense for your most recent lease to continue',
            next_btn_disabled: true
          });
        }
        break;
      }
      case 3: {
        const { bedrooms, roommates, square_feet } = this.props.formValues;
        if (
          bedrooms === undefined ||
          roommates === undefined ||
          square_feet === undefined
        ) {
          return this.setState({
            formError:
              'Please provide the property details of your most recent lease to continue',
            next_btn_disabled: true
          });
        }
        break;
      }
      case 4: {
        const { perks } = this.props.formValues;

        if (perks === undefined || perks.length === 0) {
          return this.setState({
            formError:
              'Please select the perk(s) that most accurately describe your recent lease',
            next_btn_disabled: true
          });
        }
        break;
      }
      default:
        break;
    }

    return this.setState({
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

  onSubmit = (event, data) => {
    event.preventDefault();

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
            // this.props.reset();
            this.setState({ formSubmitted: true, formError: '' });
          })
          .catch(error => {
            this.setState({
              formError: 'There was an error submitting your info'
            });
          });
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

  renderEmailInput = ({ input, meta: { touched, error } }) => {
    return (
      <div className="email_wrapper">
        <input
          id="email_input"
          {...input}
          placeholder={'email'}
          type={'email'}
        />
        <div className="street_error_container">
          {touched && (error && <span className="street_error">{error}</span>)}
        </div>
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
          <button className="button is-outlined next_btn" type="submit">
            Submit
          </button>
          <button
            type="button"
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
            onClick={this.handleNext.bind(this)}
          >
            Next
          </button>

          {step > 0 && (
            <button
              type="button"
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

  renderForm = () => {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      formValues,
      initialValues
    } = this.props;

    const { finished, stepIndex } = this.state;

    if (!this.state.formSubmitted) {
      return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this, event))}>
          <Stepper id="stepper" activeStep={stepIndex} orientation="vertical">
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
                <div className="slider_wrapper">
                  <label style={{ fontSize: '1rem' }}>
                    Lease Start:{' '}
                    <span
                      hidden={
                        this.props.formValues &&
                        !this.props.formValues.lease_start
                      }
                      className="slider_date"
                    >
                      {this.renderLeaseDate('lease_start')}
                    </span>
                  </label>

                  <Field
                    name="lease_start"
                    component={Slider}
                    format={null}
                    defaultValue={new Date().valueOf() - 31556952000}
                    min={new Date(2015, 0, 1).valueOf()}
                    max={new Date().valueOf() + 31556952000}
                    step={1}
                    ref={this.saveRef}
                    withRef
                  />
                </div>

                <div className="slider_wrapper">
                  <label style={{ fontSize: '1rem' }}>
                    Lease End:{' '}
                    <span
                      hidden={
                        this.props.formValues &&
                        !this.props.formValues.lease_end
                      }
                      className="slider_date"
                    >
                      {this.renderLeaseDate('lease_end')}
                    </span>
                  </label>

                  <Field
                    name="lease_end"
                    component={Slider}
                    defaultValue={new Date().valueOf()}
                    format={null}
                    min={new Date(2015, 0, 1).valueOf()}
                    max={new Date().valueOf() + 31556952000}
                    step={1}
                    ref={this.saveRef}
                    withRef
                  />
                </div>

                {this.renderStepActions(1)}
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Monthly Cost</StepLabel>

              <StepContent id="monthly_totals" className="step_content">
                <div className="slider_wrapper">
                  <label style={{ fontSize: '1rem' }}>
                    Total Rent:{' '}
                    <span
                      hidden={
                        this.props.formValues &&
                        !this.props.formValues.total_rent
                      }
                      className="monthly_values"
                    >
                      <span className="currency_symbol">$</span>
                      {this.props.formValues
                        ? this.props.formValues.total_rent
                        : this.props.initialValues.total_rent}
                    </span>
                  </label>

                  <Field
                    name="total_rent"
                    component={Slider}
                    defaultValue={0}
                    format={null}
                    min={0}
                    max={6000}
                    step={100}
                    ref={this.saveRef}
                    withRef
                  />
                </div>

                <div className="slider_wrapper">
                  <label style={{ fontSize: '1rem' }}>
                    Total Utilities: <span />
                    <span
                      hidden={
                        this.props.formValues &&
                        !this.props.formValues.utilities
                      }
                      className="monthly_values"
                    >
                      <span className="currency_symbol">$</span>
                      {this.props.formValues
                        ? this.props.formValues.utilities
                        : this.props.initialValues.utilities}
                    </span>
                  </label>

                  <Field
                    name="utilities"
                    component={Slider}
                    defaultValue={0}
                    format={null}
                    min={0}
                    max={1000}
                    step={10}
                    ref={this.saveRef}
                    withRef
                  />
                </div>

                {this.renderStepActions(2)}
              </StepContent>
            </Step>

            <Step>
              <StepLabel>Property Details</StepLabel>

              <StepContent className="step_content">
                <Field
                  id="bedrooms_selector"
                  name="bedrooms"
                  component={SelectField}
                  floatingLabelText="Number of Bedrooms"
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
                  component={SelectField}
                  floatingLabelText="Number of Roommates"
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
                  component={SelectField}
                  floatingLabelText="Square Footage"
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
                <Field name="email" component={this.renderEmailInput} />

                {this.renderStepActions(5)}
              </StepContent>
            </Step>
          </Stepper>
        </form>
      );
    } else {
      return (
        <div className="congrats_container">
          <h1>Congratulations Message!</h1>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="signup_container">
        <div className="header_container">
          <h2>Contribute Your Rent Info Anonymously</h2>
          <p>Help bring transparency to San Francisco's rental market</p>
        </div>

        <MuiThemeProvider muiTheme={muiTheme}>
          <Paper zDepth={1} className="paper_container">
            <div className="stepper_container">{this.renderForm()}</div>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Signup;
