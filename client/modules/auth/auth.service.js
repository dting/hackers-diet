import cookie from 'react-cookie';
import { actions as authActions } from './';
import { actions as userActions } from '../user';

export default {
  checkAuth(store) {
    store.dispatch(authActions.setToken(cookie.load('token')));
    const { auth } = store.getState();
    if (!auth.token) {
      return store.dispatch(userActions.UNSET_USER);
    }
    return store.dispatch(userActions.me(auth.token));
  },
};
