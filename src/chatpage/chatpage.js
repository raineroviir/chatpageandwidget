import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './Containers/App'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('chatcenter-chatpage')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
