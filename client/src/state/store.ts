import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduce from './reducers';
import { movePlayer } from './middlewares';

const store = createStore(
  reduce,
  composeWithDevTools(applyMiddleware(movePlayer)),
);

export default store;
