import cookie from 'react-cookie';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../App';
import { Home, Login } from '../containers';
import { actions as authActions } from '../modules/auth';
import { actions as userActions } from '../modules/user';

const routes = {
  getRoutes(store) {

    const authRequired = function requireAuth(nextState, replace) {
      const token = cookie.load('token') || null;
      store.dispatch(authActions.setToken(token));
      if (!token) {
        store.dispatch(userActions.unset());
        return replace('/login');
      }
      return store.dispatch(userActions.me(token))
        .catch(() => {
          cookie.remove('token');
          return replace('/login');
        });
    }

    return (
      <Route path="/" component={App}>
        <IndexRoute component={Home} onEnter={authRequired} />
        <Route path="login" component={Login} />
      </Route>
    );
  },
};

export default routes;
