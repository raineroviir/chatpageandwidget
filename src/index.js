import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { createHistory } from 'history';
//import { createHashHistory } from 'history';
import configureStore from './store/configureStore';
import routes from './routes';
require("containers/App/scripts/chatcenter.js");
import ApiService from './api.service';


//const history = useRouterHistory(createHashHistory)({ queryKey: false });
/*const history = useRouterHistory(createHistory)({
  basename: '/'
})*/
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

