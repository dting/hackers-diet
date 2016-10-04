import { types } from './';
import { api as apiUtil } from '../util';

const actions = {};

actions.connect = function connect(token, data) {
  const promise = fetch('/api/users/connect', apiUtil.jsonPostOptions(token, data))
    .then(apiUtil.checkStatus)
    .then(apiUtil.parseJson);

  return {
    type: types.USER_CONNECT,
    payload: promise,
  };
};

actions.me = function me(token) {
  const promise = fetch('/api/users/me', apiUtil.jsonGetOptions(token))
    .then(apiUtil.checkStatus)
    .then(apiUtil.parseJson);

  return {
    type: types.USER_CHECK,
    payload: promise,
  };
};

actions.unset = function unset() {
  return { type: types.USER_UNSET };
};

export default actions;
