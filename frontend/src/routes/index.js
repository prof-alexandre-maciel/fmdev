import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main'
import SignIn from '../pages/SignIn'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='signin' component={SignIn} />
      <Route path='/' exact component={Main} />
    </Switch>
  </BrowserRouter>
)

export default Routes