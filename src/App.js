import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './core/Home'
import ErrorPage from './core/Error'
import Login from './User/Login'
import Register from './User/Register'
import GetCat from './AdminPannel/Getcategory'
import Addcat from './AdminPannel/Addcat'
import GetDish from './AdminPannel/Getdish'
import Adddish from './AdminPannel/AddDish'
import Editdish from './AdminPannel/Editdish';
import Editcat from './AdminPannel/Editcat';

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
            <Route  path='/get/dishes' exact component={GetDish} />
            <Route  path='/add/dish' exact component={Adddish} />
            <Route  path='/edit/dish/:dishname' exact component={Editdish} />
            <Route  path='/edit/category/:catname' exact component={Editcat} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;