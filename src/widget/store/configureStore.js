import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../../common/reducers';

const logger = createLogger({
  collapsed: (getState, action) => {
    return action
  }
});

const middleware = applyMiddleware(thunkMiddleware, logger);

export default function configureStore(initialState) {
  const store = middleware(createStore)(rootReducer, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../../common/reducers', () => {
      const nextRootReducer = require('../../common/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
