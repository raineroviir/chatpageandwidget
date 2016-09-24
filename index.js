import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './Containers/App'

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('chat-center-widget')
const rootElementStyle = rootElement.getAttribute('data-style')
const channelid = rootElement.getAttribute('chat-data-id')

render(
  <Provider store={store}>
    <App channelid={channelid} style={JSON.parse(rootElementStyle)}/>
  </Provider>,
  rootElement
)
