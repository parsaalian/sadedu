import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Login from './login/login';
import Admin from './admin/admin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/*<Route path='/' exact component={Login} />*/}
        <Route path='/' component={Admin} />
      </BrowserRouter>
    );
  }
}

export default App;
