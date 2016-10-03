import { types } from './';

const actions = {};

actions.unset = function set(user) {
  return { type: types.USER_UNSET };
};

actions.me = function me(token) {
  const promise = fetch('/api/users/me', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
  .then((response) => response.json());
  return {
    type: types.USER_CHECK,
    payload: promise,
  };
};

export default actions;
