/* eslint-disable import/no-named-as-default */
import React, { Component } from 'react';

import { Switch,  Route } from 'react-router-dom';
import UserBets from './pages/UserBets';
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
          <Route exact path="/" component={UserBets} />
          <Route path="/calendar" component={UserBets} />
          <Route path="/user-history" component={UserBets} />
          <Route path="/horses-history" component={UserBets}/>
          <Route component={NotFoundPage}/>
        </Switch>
      </div>
    );
  }
}
