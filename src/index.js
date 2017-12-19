import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { BrowserRouter } from 'react-router-dom'
import AppContainer from './containers/AppContainer';

const store = createStore(reducer)

render((
  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));
