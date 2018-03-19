/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';

import { Switch,  Route } from 'react-router-dom';
import UserBets from './pages/UserBets';
import Events from './pages/Events';
import NotFoundPage from './pages/NotFoundPage';
import '../styles/style.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

export default class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/events/:type" component={Events} />
          <Route path="/" component={UserBets} />
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}
