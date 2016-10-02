import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import middleware from './config/middleware';
import reducers from './config/reducers';
import routes from './config/routes';

const store = createStore(reducers, middleware);

ReactDOM.render((
  <Provider store={store}>
    {routes}
  </Provider>
), document.getElementById('app'));
