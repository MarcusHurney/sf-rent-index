import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import LandingNavBar from '../components/LandingNavBar';
import { getCurrentUser } from '../../../state/Common/queries';
import { login } from '../../../state/Login/mutations';

export default compose(
  // graphql(getCurrentUser),
  graphql(login)
)(withRouter(LandingNavBar));
