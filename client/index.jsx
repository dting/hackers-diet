import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'

import middleware from './config/middleware';
import reducers from './config/reducers';
import routes from './config/routes';

const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

function checkAuth(nextState, replaceState) {
  let { loggedIn } = store.getState();

  // check if the path isn't dashboard
  // that way we can apply specific logic
  // to display/render the path we want to
  if (nextState.location.pathname !== '/dashboard') {
    if (loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  } else {
    // If the user is already logged in, forward them to the homepage
    if (!loggedIn) {
      if (nextState.location.state && nextState.location.pathname) {
        replaceState(null, nextState.location.pathname);
      } else {
        replaceState(null, '/');
      }
    }
  }
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes.getRoutes(store)}
    </Router>
  </Provider>
), document.getElementById('app'));
