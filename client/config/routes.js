import cookie from 'react-cookie';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../App';
import { Home, Login, Connect } from '../containers';
import { actions as authActions } from '../modules/auth';
import { actions as userActions } from '../modules/user';

const routes = {
  getRoutes(store) {
    store.dispatch(authActions.setToken(cookie.load('token') || null));

    const authRequired = function requireAuth(nextState, replace) {
      const { auth, user } = store.getState();
      if (!auth.token) {
        return store.dispatch(authActions.logout(replace));
      }
      if (!user._id) {
        return store.dispatch(userActions.me(auth.token))
          .catch(() => store.dispatch(authActions.logout(replace)));
      }
      return undefined;
    };

    return (
      <Route path="/" component={App}>
        <Route onEnter={authRequired}>
          <IndexRoute component={Home} />
          <Route path="connect" component={Connect} />
        </Route>
        <Route path="login" component={Login} />
      </Route>
    );
  },
};

export default routes;
