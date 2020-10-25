import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home'
import ErrorPage from './core/Error'
import Login from './User/Login'
import Register from './User/Register'
import GetCat from './AdminPannel/Getcategory'
import Addcat from './AdminPannel/Addcat'

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Switch>
            <Route  path='/' exact component={Home} />
            <Route  path='/register' exact component={Register} />
            <Route  path='/login' exact component={Login} />
            <Route  path='/get/category' exact component={GetCat} />
            <Route  path='/add/category' exact component={Addcat} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;