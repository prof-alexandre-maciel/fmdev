import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import history from '../routes/history';
import rootReducer from './ducks';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'seamless-immutable';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const configureStore = (initialState) => {
  return createStore(
    rootReducer(history),
    Immutable(initialState),
    composeWithDevTools(
      applyMiddleware(...middlewares)
    ));
}

const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store;