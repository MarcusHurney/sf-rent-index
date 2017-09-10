import { combineReducers } from 'redux';
import client from './apollo-config';

export default combineReducers({
  apollo: client.reducer()
});
