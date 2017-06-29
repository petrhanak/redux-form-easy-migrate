import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux'
import { App } from './components/App'

const rootElement = document.getElementById('app');

const store = createStore(
  combineReducers({
    form: formReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);