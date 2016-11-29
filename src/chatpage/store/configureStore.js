import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV !== `production`) {
  const createLogger = require('redux-logger')
  const logger = createLogger({
    collapsed: (getState, action) => {
      return action
    },
    predicate: (getState, action) => action.type !== "CHANGE_WIDTH_AND_HEIGHT"
  });
  middlewares.push(logger)
}

const middleware = applyMiddleware(...middlewares);

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
