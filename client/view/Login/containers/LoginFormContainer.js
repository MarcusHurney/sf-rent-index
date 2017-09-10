import { graphql } from 'react-apollo';
import LoginForm from '../components/LoginForm';
import { getCurrentUser } from '../../../state/Common/queries';
import { login } from '../../../state/Login/mutations';


export default graphql(getCurrentUser)(
  graphql(login)(LoginForm)
);
