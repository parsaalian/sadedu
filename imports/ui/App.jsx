import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router';
import history from 'history';
import Login from './login/login';

const browserHistory = history.createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
