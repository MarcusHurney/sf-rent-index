import React, { Component } from 'react';
import { Field } from 'redux-form'

import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';

import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import CustomSlider from '../../Common/components/CustomSlider';
import Rheostat from 'rheostat';

import moment from 'moment';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';

class Signup extends Component {
  state = {
    address: '',
    finished: false,
    stepIndex: 0,
  }

  handleAddressInput = address => {
    this.setState({ address });
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4,
    });
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  onSubmit = data => {
    geocodeByAddress(this.props.formValues.address)
    .then(results => getLatLng(results[0]))
    .then(latLng => console.log('Success', latLng))
    .catch(error => console.error('Error', error))
  }

  renderSuggestion = ({ formattedSuggestion }) => {
    return (
      <div>
        <strong>{ formattedSuggestion.mainText }</strong>{' '}
        <small>{ formattedSuggestion.secondaryText }</small>
      </div>
    );
  }

  renderAddressInput = ({ input: { onChange, value }, meta }) => {
    const inputProps = {
      value,
      onChange,
      type: 'search',
      placeholder: '1580 Gough Street, San Francisco, CA',
      autoFocus: true,
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
          inputProps={inputProps}
          classNames={cssClasses}
          options={config}
          debounce={200}
          highlightFirstSuggestion={true}
          autocompleteItem={this.renderSuggestion}
          googleLogo={false}
        />
      </div>
    );
  }

  renderInputField = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
      <div>
        <div>
          <input {...input} placeholder={label} type={type} />
          {
            touched &&
            ((error && <span className="input_error">{error}</span>) || (warning && <span>{warning}</span>))
          }
        </div>
      </div>
    );
  }

  renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => {
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
  }

  renderSlider = ({ input, meta: { touched, error } }) => {
    const startDate = new Date(2015, 0, 1).valueOf();
    const endDate = new Date().valueOf();
    console.log(input);
    return (
      <div className="slider_container">
        <CustomSlider
          min={startDate}
          max={endDate}
          formatValue={(value) => {
            const date = new Date(value);
            return `${moment(date).format('MMMM YYYY')}`;
          }}
          values={[startDate, endDate]}
        />
      </div>
    );
  }

  renderStepActions = step => {
    const { stepIndex } = this.state;
    const { submitting } = this.props;

    if (stepIndex === 5) {
      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            type="submit"
            label={'Submit'}
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            style={{marginRight: 12}}
          />
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />
        </div>

      );
    } else {
      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            label='Next'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={this.handleNext}
            style={{marginRight: 12}}
          />
          {step > 0 && (
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              disableTouchRipple={true}
              disableFocusRipple={true}
              onClick={this.handlePrev}
            />
          )}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { finished, stepIndex } = this.state;

    return (
      <div className="signup_container">
        <div className="signup_hero">
          Enter your rent data anonymously. Give leverage back to the renter.
        </div>

        <Paper zDepth={1} className="paper_container">
          <div className="stepper_container">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <Stepper activeStep={stepIndex} orientation="vertical">

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
                  <StepLabel>Lease Details</StepLabel>

                  <StepContent className="step_content">
                    <label style={{ fontSize: '1rem' }}>Span of lease</label>

                    {this.renderStepActions(1)}
                  </StepContent>
                </Step>

                <Step>
                  <StepLabel>Monthly Cost</StepLabel>

                  <StepContent className="step_content">


                    <Field
                      name="total_rent_cost"
                      type="text"
                      component={this.renderInputField}
                      label="rent per month -- Ex. $3000"
                    />

                    <Field
                      name="estimated_utilities_cost"
                      type="text"
                      component={this.renderInputField}
                      label="utilities per month (approx) -- Ex. $100"
                    />

                    {this.renderStepActions(2)}
                  </StepContent>
                </Step>

                 <Step>
                   <StepLabel>Property Details</StepLabel>

                   {/* Square Footage */}

                   <StepContent className="step_content">
                     <Field
                       name="number_bedrooms"
                       component={this.renderSelectField}
                       label="Number of bedrooms"
                     >
                       <MenuItem value="1" primaryText="1" />
                       <MenuItem value="2" primaryText="2" />
                       <MenuItem value="3" primaryText="3" />
                       <MenuItem value="4" primaryText="4" />
                       <MenuItem value="5" primaryText="5" />
                       <MenuItem value="5+" primaryText="5+" />
                     </Field>

                     <Field
                       name="number_roommates"
                       component={this.renderSelectField}
                       label="Number of roommates"
                     >
                       <MenuItem value="1" primaryText="1" />
                       <MenuItem value="2" primaryText="2" />
                       <MenuItem value="3" primaryText="3" />
                       <MenuItem value="4" primaryText="4" />
                       <MenuItem value="5" primaryText="5" />
                       <MenuItem value="5+" primaryText="5+" />
                     </Field>
                     {this.renderStepActions(3)}
                   </StepContent>
                 </Step>

               <Step>
                 <StepLabel>Perks</StepLabel>
                 <StepContent className="step_content">
                   <Field name="perks" type="text" component={this.renderInputField} label="gym, sauna, view" />
                   {this.renderStepActions(4)}
                 </StepContent>
               </Step>

               <Step>
                 <StepLabel>How should we contact you when the data's in?</StepLabel>
                 <StepContent className="step_content">
                   <Field name="email" type="email" component={this.renderInputField} label="Email" />
                   {this.renderStepActions(5)}
                 </StepContent>
               </Step>
             </Stepper>

             {finished && (
               <p style={{margin: '20px 0', textAlign: 'center'}}>
                 <a
                   href="#"
                   onClick={(event) => {
                     event.preventDefault();
                     this.setState({stepIndex: 0, finished: false});
                   }}
                 >
                   Click here
                 </a> to reset the example.
               </p>
             )}
           </form>
         </div>
       </Paper>
     </div>
   );
 }
}

export default Signup;
