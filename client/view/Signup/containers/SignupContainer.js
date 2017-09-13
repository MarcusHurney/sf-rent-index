import { graphql } from 'react-apollo';
import { reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom';

// mutations
import { signup } from '../../../state/Signup/mutations';

// components
import Signup from '../components/Signup';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'number_bedrooms',
    'square_feet',
    'total_rent',
    'room_rent',
    'number_roommates',
    'start_date',
    'end_date'
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
  return errors
}

const SignupForm = reduxForm({
  form: 'SignupForm',
  validate
})(Signup);

export default graphql(signup)(withRouter(SignupForm));
