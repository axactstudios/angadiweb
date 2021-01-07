import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

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
import Addoffer from './AdminPannel/Offersection';
import Editoffer from './AdminPannel/Editoffer'
import Getuser from './AdminPannel/Getuser';
import Getorderfromuser from './AdminPannel/Getorderfromuser'
import Adminpannel from './AdminPannel/AdminDashboardHOC';
import EditInventary from './AdminPannel/EditInventary'
import Addemirates from './AdminPannel/Addemirates'
import AddemirateArea from './AdminPannel/AddArea'
import Areaemirate from './AdminPannel/Getemirates'

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
import Notification from './core/Notification'

import Myads from './User/Myadds'
import Userdashboard from './User/UserDashboard';
import ForgetPassword from './User/ForgetPassword';
import Resetpass from './User/ResetPassword'
import UpdateProfile from './User/Profile'

const App = () => {
  let location = window.location;
  location = location.pathname.substring(0,6);

  return (
    <div>
      <div>
        <BrowserRouter>
          { location == '/admin' ? null : <Menu /> }
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
            <Route path='/users/password/forget' exact component={ForgetPassword} />
            <Route path='/notif' exact component={Notification} />

            <AdminRoute path='/admin/get/category' exact component={Adminpannel(GetCat)} />
            <AdminRoute path='/admin/create/category' exact component={Adminpannel(Addcat)} />
            <AdminRoute path='/admin/get/dishes' exact component={Adminpannel(GetDish)} />
            <AdminRoute path='/admin/add/dish' exact component={Adminpannel(Adddish)} />
            <AdminRoute path='/admin/edit/dish/:dishname' exact component={Adminpannel(Editdish)} />
            <AdminRoute path='/admin/edit/category/:catname' exact component={Adminpannel(Editcat)} /> 
            <AdminRoute path='/admin/edit/offer/:offerId' exact component={Adminpannel(Editoffer)} />
            <AdminRoute path='/admin/edit/order/:orderId' exact component={Adminpannel(Editorder)} />
            <AdminRoute path='/admin/get/orders' exact component={Adminpannel(Getorder)} />
            <AdminRoute path='/admin/add/offer' component={Adminpannel(Addoffer)} />
            <AdminRoute path='/admin/get/offers' exact component={Adminpannel(Getoffer)} />
            <AdminRoute path='/admin/get/users' exact component={Adminpannel(Getuser)} />
            <AdminRoute path='/admin/orders/from/user/:userId' exact component={Adminpannel(Getorderfromuser)} />
            <AdminRoute path='/admin/dashboard' exact component={Adminpannel()} />
            <AdminRoute path='/admin/edit/inventary' exact component={Adminpannel(EditInventary)} />
            <AdminRoute path='/admin/add/emirates' exact component={Adminpannel(Addemirates)} />
            <AdminRoute path='/admin/add/area' exact component={Adminpannel(AddemirateArea)} />
            <AdminRoute path='/admin/get/area' exact component={Adminpannel(Areaemirate)} />

            <PrivateRoute exact path='/user/dashboard' component={Userdashboard()} />
            <PrivateRoute exact path='/user/dashboard/mycart' component={Userdashboard(Cart, "My Cart")} />
            <PrivateRoute exact path='/user/dashboard/myorders' component={Myads} />
            <PrivateRoute exact path='/user/dashboard/updateprofile' component={Userdashboard(UpdateProfile, "Update Profile")} />
            <PrivateRoute exact path='/user/dashboard/resetpassword' component={Userdashboard(Resetpass, "Reset Password")} />
            <Route component={ErrorPage} />
          </Switch>
          { location == '/admin' ? null : <Footer /> }
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;