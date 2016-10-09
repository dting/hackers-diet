import { types } from './';
import api from '../util/util.api';

const actions = {};

actions.connect = function connect(token, data) {
  return (dispatch) => {
    const promise = fetch(`${process.env.DOMAIN || ''}/api/users/connect`,
      api.jsonPostOptions(token, data))
      .then(api.checkStatus)
      .then(api.parseJson);

    return dispatch({
      type: types.USER_CONNECT,
      payload: promise,
    });
  };
};

actions.me = function me(token) {
  return (dispatch) => {
    const promise = fetch(`${process.env.DOMAIN || ''}/api/users/me`,
      api.jsonGetOptions(token))
      .then(api.checkStatus)
      .then(api.parseJson);

    return dispatch({
      type: types.USER_CHECK,
      payload: promise,
    });
  };
};

actions.unset = function unset() {
  return { type: types.USER_UNSET };
};

export default actions;
