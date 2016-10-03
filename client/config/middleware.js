import { applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middleware = [
  thunk,
  promiseMiddleware(),
  routerMiddleware(browserHistory),
];

export default compose(applyMiddleware(...middleware), devTools);
