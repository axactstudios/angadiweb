import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './helpers/PrivateRoute';
import AdminRoute from './helpers/AdminRoute';

import GetCat from './AdminPannel/Getcategory'
import Addcat from './AdminPannel/Addcat'
import GetDish from './AdminPannel/Getdish'
import Adddish from './AdminPannel/AddDish'
import Editdish from './AdminPannel/Editdish';
import Editcat from './AdminPannel/Editcat';
import Getorder from './AdminPannel/Getorder';
import Editorder from './AdminPannel/Editorder'
import Getoffer from './AdminPannel/Getoffer';
import Addoffer from './AdminPannel/Addoffer';
import Editoffer from './AdminPannel/Editoffer'
import Getuser from './AdminPannel/Getuser';
import Getorderfromuser from './AdminPannel/Getorderfromuser'
import Adminpannel from './User/AdminDashboard';

import Home from './core/Home'
import ErrorPage from './core/Error'
import Login from './User/Login'
import Register from './User/Register'
import Cart from './core/Cart'
import Product from './core/Product';
import Menu from './core/Menu'
import Footer from './core/Footer'
import Shop from './core/Shop'
import Contact from './core/Contact'

import Myads from './User/Myadds'
import Userdashboard from './User/UserDashboard';


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
            <Route path='/cart' exact component={Cart} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/shop/:categoryId' exact component={Shop} />
            <Route path='/shop/:categoryId/:categoryName' exact component={Shop} />
            <Route path='/dish/:dishId' exact component={Product} />
            <Route path='/contact/us' exact component={Contact} />

            <AdminRoute path='/get/category' exact component={GetCat} />
            <AdminRoute path='/create/category' exact component={Addcat} />
            <AdminRoute path='/get/dishes' exact component={GetDish} />
            <AdminRoute path='/add/dish' exact component={Adddish} />
            <AdminRoute path='/edit/dish/:dishname' exact component={Editdish} />
            <AdminRoute path='/edit/category/:catname' exact component={Editcat} />
            <AdminRoute path='/get/orders' exact component={Getorder} />
            <AdminRoute path='/edit/order/:orderId' exact component={Editorder} />
            <AdminRoute path='/add/offer' exact component={Addoffer} />
            <AdminRoute path='/get/offers' exact component={Getoffer} />
            <AdminRoute path='/edit/offer/:offerId' exact component={Editoffer} />
            <AdminRoute path='/get/users' exact component={Getuser} />
            <AdminRoute path='/orders/from/user/:userId' exact component={Getorderfromuser} />
            <AdminRoute path='/admin/dashboard' exact component={Adminpannel} />

            <PrivateRoute path='/user/dashboard' exact component={Userdashboard} />
            <PrivateRoute path='/my/ads' exact component={Myads} />
            <Route component={ErrorPage} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;