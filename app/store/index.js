import { createStore, applyMiddleware } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import thunk from 'redux-thunk';

import reducer from './reducer';
import clients from './clients';

const middlewares = [];

const axiosMiddleware = multiClientMiddleware(clients, {
  defaultClientName: 'default',
  returnRejectedPromiseOnError: true,
});

middlewares.push(thunk);
middlewares.push(axiosMiddleware);

if (__DEV__) {
  const { createLogger } = require('redux-logger');
  const logger = createLogger({ duration: true, diff: true });
  middlewares.push(logger);
  console.log('[REDUX] Redux logger added!');
}

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
