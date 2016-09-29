import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger({
  predicate: (getState, action) => {
    return (process.env.NODE_ENV !== `production` && (action.type !== "CHANGE_WIDTH_AND_HEIGHT" || "CHANGE_IS_MOBILE"))
  },
  collapsed: (getState, action) => {
    return action.type === "INITIALIZED_SOCKET" || "RECEIVED_GUEST_INFO" || "FETCHING_WIDGET_BY_CHANNEL_ID" || "INIT_WIDGET_CONFIG_INITIAL_STATE"
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
