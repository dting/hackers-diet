import cookie from 'react-cookie';
import { replace } from 'react-router-redux';

import { types } from './';
import { actions as userActions } from '../user';

const actions = {};

actions.logout = function logout(cb) {
  return (dispatch) => {
    cookie.remove('token');
    dispatch(userActions.unset());
    dispatch(actions.unsetToken());
    if (typeof cb === 'function') {
      cb('/login');
    } else {
      dispatch(replace('/login'));
    }
  };
};

actions.setToken = function setToken(token) {
  return { type: types.AUTH_SET_TOKEN, token };
};

actions.unsetToken = function unsetToken() {
  return { type: types.AUTH_UNSET_TOKEN };
};

export default actions;
