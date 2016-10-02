import { applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

const devTools = window.devToolsExtension ? window.devToolsExtension() : f => f;
const middleware = [thunk, promiseMiddleware()];

export default compose(applyMiddleware(...middleware), devTools);
