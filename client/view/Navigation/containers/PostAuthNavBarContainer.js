import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PostAuthNavBar from '../components/PostAuthNavBar';
import { getCurrentUser } from '../../../state/Common/queries';
import { logout } from '../../../state/Login/mutations';

export default compose(
  graphql(getCurrentUser),
  graphql(logout)
)(withRouter(PostAuthNavBar));
