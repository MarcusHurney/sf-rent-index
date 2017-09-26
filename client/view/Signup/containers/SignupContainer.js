import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import {
  reduxForm,
  getFormValues,
  getFormSyncErrors,
  getFormMeta,
  getFormNames,
  isDirty,
  isPristine,
  isValid,
  isInvalid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed
} from 'redux-form'

// mutations
import { signup } from '../../../state/Signup/mutations';

// components
import Signup from '../components/Signup';

const validate = values => {
  const errors = {};

  const requiredFields = [
    'street_address',
    'lease_start',
    'lease_end',
    'bedrooms',
    'square_feet',
    'total_rent',
    'utilities',
    'room_rent',
    'roommates',
    'perks',
    'email'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors;
}


const SignupForm = reduxForm({
  form: 'signupForm',
  validate
})(Signup);

export default compose(
  connect((state) => {
    return {
      initialValues: {
        lease_start: new Date(2015, 0, 1).valueOf(),
        lease_end: new Date().valueOf()
      },
      formValues: getFormValues('signupForm')(state),
      formErrors: getFormSyncErrors('signupForm')(state),
      fields: getFormMeta('signupForm')(state),
      dirty: isDirty('signupForm')(state),
      pristine: isPristine('signupForm')(state),
      valid: isValid('signupForm')(state),
      invalid: isInvalid('signupForm')(state),
      submitting: isSubmitting('signupForm')(state),
      submitSucceeded: hasSubmitSucceeded('signupForm')(state),
      submitFailed: hasSubmitFailed('signupForm')(state)
    };
  }),
  graphql(signup)
)(SignupForm);
