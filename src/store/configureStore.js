import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger({
  predicate: (getState, action) => {
    return action.type !== "CHANGE_WIDTH_AND_HEIGHT"
  },
  collapsed: (getState, action) => {
    return action
  }
});

const middleware = applyMiddleware(thunkMiddleware, logger);

export default function configureStore(initialState) {
  const store = middleware(createStore)(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
