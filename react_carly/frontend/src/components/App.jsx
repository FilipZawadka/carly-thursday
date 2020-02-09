import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Provider } from 'react-redux'

import PageCarsList from './PageCarsList';
import PageLogin from './PageLogin';
import PageCalendar from './PageCalendar';

import store from './store';

const App = () => (
  <Provider id="App" store={store}>
    <Router>
      <Switch>
        <Route exact path="/">
          <PageLogin></PageLogin>
        </Route>
        <Route exact path="/list">
          <PageCarsList></PageCarsList>
        </Route>
        <Route exact path="/calendar">
          <PageCalendar></PageCalendar>
        </Route>
      </Switch>
    </Router>
  </Provider>
)

export default App