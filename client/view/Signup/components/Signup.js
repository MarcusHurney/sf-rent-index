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

import LabeledSlider from '../../Common/components/LabeledSlider';

import moment from 'moment';

class Signup extends Component {
  state = {
    finished: false,
    stepIndex: 0,
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
    console.log("Submit fired!");
    console.log(this.props);
    console.log(data);
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

  renderSlider = ({ meta: { touched, error } }) => {
    const startDate = new Date(2015, 0, 1).valueOf();
    const endDate = new Date().valueOf();

    return (
      <LabeledSlider
        min={startDate}
        max={endDate}
        formatValue={(value) => {
          const date = new Date(value);
          return `${moment(date).format('MMMM YYYY')}`;
        }}
        values={[startDate, endDate]}
      />
    );
  }

  renderStepActions = step => {
    const { stepIndex } = this.state;
    const { submitting } = this.props;

    if (stepIndex === 3) {
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
                  <StepLabel>Lease Details</StepLabel>

                  <StepContent>
                    <Field
                      name="span_of_lease"
                      label="Span of Your Lease"
                      component={this.renderSlider}
                    />

                    <Field
                      name="total_rent_cost"
                      type="text"
                      component={this.renderInputField}
                      label="Total price of rent per month"
                    />

                    <Field
                      name="estimated_utilities_cost"
                      type="text"
                      component={this.renderInputField}
                      label="Estimated cost of utilities per month"
                    />

                    {this.renderStepActions(0)}
                  </StepContent>
                </Step>

                 <Step>
                   <StepLabel>Property Details</StepLabel>

                   {/* Square Footage */}

                   <StepContent>
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
                     {this.renderStepActions(1)}
                   </StepContent>
                 </Step>

               <Step>
                 <StepLabel>Perks</StepLabel>
                 <StepContent>
                   <Field name="perks" type="text" component={this.renderInputField} label="gym, sauna, view" />
                   {this.renderStepActions(2)}
                 </StepContent>
               </Step>

               <Step>
                 <StepLabel>How should we contact you when the data's in?</StepLabel>
                 <StepContent>
                   <Field name="email" type="email" component={this.renderInputField} label="Email" />
                   {this.renderStepActions(3)}
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
