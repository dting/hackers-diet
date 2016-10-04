import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import middleware from './config/middleware';
import reducers from './config/reducers';
import routes from './config/routes';

const store = createStore(reducers, middleware);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      {routes.getRoutes(store)}
    </Router>
  </Provider>
), document.getElementById('app'));
