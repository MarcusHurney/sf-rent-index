import { combineReducers } from 'redux';
import client from './apollo-config';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  apollo: client.reducer()
});
