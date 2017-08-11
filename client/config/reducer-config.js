import { combineReducers } from 'redux';
import client from './apollo-config';
import movie_list from '../state/reducers/MovieListReducer';

export default combineReducers({
  movie_list,
  apollo: client.reducer()
});
