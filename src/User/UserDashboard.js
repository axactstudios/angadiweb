import React, { useState } from 'react';
import { isAuth } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../Styles/userdash.css';

const UserDashboard = WrappedComponent => {

  const newComponent = () => {
    const {Name, email, pUrl} = isAuth();
  
    return (
      <div className="dashboard">
        <div className="dashboard-head">
          Welcome {Name}
        </div>
        <div className='dashboard-main'>
          <div className="dashboard-nav">
            <Link to='/user/dashboard' className='dashboard-nav-link'> Dashboard </Link>
            <Link to='/user/dashboard/updateprofile' className='dashboard-nav-link'> Update Profile </Link>
            <Link to='/user/dashboard/myorders' className='dashboard-nav-link'> My Orders </Link>
            <Link to='/user/dashboard/mycart' className='dashboard-nav-link'> My Cart </Link>
            <Link to='/user/dashboard/resetpassword' className='dashboard-nav-link'> Reset Password </Link>
            <Link to='/'> <Logout /> </Link>
          </div>
          <div className="dashboard-content">
            { WrappedComponent ? <WrappedComponent /> : <div>hello</div> }
          </div>
        </div>
      </div>
    )
  }

  return newComponent;
};

export default UserDashboard;