import { graphql, compose } from 'react-apollo';
import LandingNavBar from '../components/LandingNavBar';
import { getCurrentUser } from '../../../state/Common/queries';
import { login } from '../../../state/Navigation/mutations';


export default compose(
  graphql(getCurrentUser),
  graphql(login)
)(LandingNavBar);
