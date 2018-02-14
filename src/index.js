import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'

import reducers from './reducers'

import App from './App'

import registerServiceWorker from './registerServiceWorker'

import './style/style.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker()
