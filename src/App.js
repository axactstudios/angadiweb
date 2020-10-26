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
import Getorder from './AdminPannel/Getorder';
import Editorder from './AdminPannel/Editorder'
import Menu from './core/Menu'
import Getoffer from './AdminPannel/Getoffer';
import Addoffer from './AdminPannel/Addoffer';
import Editoffer from './AdminPannel/Editoffer'
import Getuser from './AdminPannel/Getuser';
import Getorderfromuser from './AdminPannel/Getorderfromuser'

const App = () => {
  return (
    <div>
      <div>
        <BrowserRouter>
          <Menu />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/get/category' exact component={GetCat} />
            <Route path='/add/category' exact component={Addcat} />
            <Route path='/get/dishes' exact component={GetDish} />
            <Route path='/add/dish' exact component={Adddish} />
            <Route path='/edit/dish/:dishname' exact component={Editdish} />
            <Route path='/edit/category/:catname' exact component={Editcat} />
            <Route path='/get/orders' exact component={Getorder} />
            <Route path='/edit/order/:orderId' exact component={Editorder} />
            <Route path='/add/offer' exact component={Addoffer} />
            <Route path='/get/offers' exact component={Getoffer} />
            <Route path='/edit/offer/:offerId' exact component={Editoffer} />
            <Route path='/get/users' exact component={Getuser} />
            <Route path='/orders/from/user/:userId' exact component={Getorderfromuser} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;