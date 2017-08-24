import { graphql } from 'react-apollo';
import SignupForm from '../components/SignupForm';
import getCurrentUser from '../../state/queries/current_user_query';
import { signup } from '../../state/mutations/auth_mutations';

export default graphql(getCurrentUser)(
  graphql(signup)(SignupForm)
); 
