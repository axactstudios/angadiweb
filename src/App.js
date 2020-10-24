import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home'
import ErrorPage from './core/Error'
import Login from './User/Login'
import Register from './User/Register'

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Switch>
            <Route  path='/' exact component={Home} />
            <Route  path='/register' exact component={Register} />
            <Route  path='/login' exact component={Login} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;