import { combineReducers } from 'redux';
import { reducers as user } from '../modules/user';

export default combineReducers({
  user,
});
