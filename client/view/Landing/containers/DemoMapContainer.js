import { graphql } from 'react-apollo';

// import DemoMap.js component
import DemoMap from '../components/DemoMap';

// import Landing queries
import { landingQueries } from '../../../state/Landing';

// deconstruct getProperties query from Landing queries object
const { getProperties } = landingQueries;

export default graphql(getProperties)(DemoMap);
