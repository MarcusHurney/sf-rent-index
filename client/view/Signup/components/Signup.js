import React, { Component } from 'react';
import { Field } from 'redux-form'

import PostAuthNavBarContainer from '../../Navigation/containers/PostAuthNavBarContainer';

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

class Signup extends Component {
  state = {
    finished: false,
    stepIndex: 0,
  }

  handleNext = () => {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev = () => {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  onSubmit = data => {
    console.log(this.props);
    console.log(data);
  }

  renderField = ({ input, label, type, meta: { touched, error, warning } }) => {
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

  renderStepActions = step => {
    const { stepIndex } = this.state;
    const { submitting } = this.props;

    if (stepIndex === 2) {
      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            label={'Submit'}
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
    } else {
      return (
        <div style={{margin: '12px 0'}}>
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
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
                  <StepLabel>Your Personal Info</StepLabel>

                  <StepContent>
                    <Field name="email" type="email" component={this.renderField} label="Email" />
                   {this.renderStepActions(0)}
                 </StepContent>
               </Step>

               <Step>
                 <StepLabel>Property Details</StepLabel>
                 <StepContent>
                   <Field
                     name="number_bedrooms"
                     component={this.renderSelectField}
                     label="Number of bedrooms"
                   >
                     <MenuItem value="1" primaryText="Yo" />
                     <MenuItem value="2" primaryText="What up" />
                     <MenuItem value="3" primaryText="Varun" />
                   </Field>
                   {this.renderStepActions(1)}
                 </StepContent>
               </Step>

               <Step>
                 <StepLabel>Perks</StepLabel>
                 <StepContent>
                   <Field name="perks" type="text" component={this.renderField} label="gym, sauna, view" />
                   {this.renderStepActions(2)}
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
