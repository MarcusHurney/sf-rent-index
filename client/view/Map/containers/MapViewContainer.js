import { graphql, compose } from 'react-apollo';
import MapView from '../components/MapView';
import { getCurrentUser } from '../../../state/Common/queries';

export default graphql(getCurrentUser)(MapView);
