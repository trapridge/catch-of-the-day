import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import StorePicker from './components/StorePicker'
import App from './components/App'
import NoMatch from './components/NoMatch'

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NoMatch} />
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'))
