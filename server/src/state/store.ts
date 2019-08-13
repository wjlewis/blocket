import { createStore, applyMiddleware } from 'redux';
import { validateMove, log } from './middlewares';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(log, validateMove),
);

export default store;
