import cookie from 'react-cookie';
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from '../Root';
import { App, Demo, Home, Login, Connect } from '../containers';
import { actions as authActions } from '../modules/auth';
import { actions as userActions } from '../modules/user';

const routes = {
  getRoutes(store) {
    store.dispatch(authActions.setToken(cookie.load('token') || null));

    const authRequired = function requireAuth(nextState, replace, done) {
      const { auth, user } = store.getState();
      if (auth.token && !user._id) {
        return store.dispatch(userActions.me(auth.token))
          .then(() => done())
          .catch(() => store.dispatch(authActions.logout(replace)))
          .then(done);
      }
      if (!auth.token) {
        store.dispatch(authActions.logout(replace));
      }
      return done();
    };

    const notAuthed = function notAuthed(nextState, replace, done) {
      const { auth, user } = store.getState();
      if (!auth.token && !user._id) {
        return done();
      }
      if (!auth.token) {
        store.dispatch(authActions.logout(replace));
        return done();
      }
      if (!user._id) {
        return store.dispatch(userActions.me(auth.token))
          .then(() => replace('/'))
          .catch(() => store.dispatch(authActions.logout(replace)))
          .then(done);
      }
      replace('/');
      return done();
    };

    return (
      <Route path="/" component={Root}>
        <Route component={App} onEnter={authRequired}>
          <IndexRoute component={Home} />
          <Route path="connect" component={Connect} />
        </Route>
        <Route path="demo" component={Demo} />
        <Route path="login" component={Login} onEnter={notAuthed} />
      </Route>
    );
  },
};

export default routes;
