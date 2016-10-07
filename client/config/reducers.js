import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import { reducers as auth } from '../modules/auth';
import { reducers as humanapi } from '../modules/humanapi';
import { reducers as user } from '../modules/user';

export default combineReducers({
  auth,
  humanapi,
  user,
  routing,
});
