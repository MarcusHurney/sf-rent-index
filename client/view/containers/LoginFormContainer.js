import { graphql } from 'react-apollo';
import LoginForm from '../components/LoginForm';
import getCurrentUser from '../../state/queries/current_user_query';
import { login } from '../../state/mutations/auth_mutations';

export default graphql(getCurrentUser)(
  graphql(login)(LoginForm)
);
