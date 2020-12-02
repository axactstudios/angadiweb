import React, { useState } from 'react';
import { isAuth } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import '../Styles/userdash.css';

const UserProfile = () => {
  const {Name, mail, pUrl} = isAuth();

  return (
    <div className='user-profile'>
      <div className='user-profile-info'>
        <img src={pUrl} />
        <div>
          {Name} <br />
          <div className='mail'>@{mail}</div>
        </div>
      </div>
      <hr />
      <div className='user-profile-quote'>
        "We don't want to push our ideas on to customers, we simply want to make what they want." <br />
        <span>- Angadi</span>
      </div>
    </div>
  )
} 

const UserDashboard = (WrappedComponent, heading) => {

  const newComponent = () => {
    const {Name, email, pUrl} = isAuth();
  
    return (
      <div className="dashboard">
        <div className="dashboard-head">
          { heading ? <h1>{heading}</h1> : <h1>Welcome {Name}</h1> }
        </div>
        <div className='dashboard-main'>
          <div className="dashboard-nav">
            <Link to='/user/dashboard' className='dashboard-nav-link'> Dashboard </Link>
            <Link to='/user/dashboard/updateprofile' className='dashboard-nav-link'> Update Profile </Link>
            <Link to='/user/dashboard/myorders' className='dashboard-nav-link'> My Orders </Link>
            <Link to='/cart' className='dashboard-nav-link'> My Cart </Link>
            <Link to='/user/dashboard/resetpassword' className='dashboard-nav-link'> Reset Password </Link>
            <Link to='/'> <Logout /> </Link>
          </div>
          <div className="dashboard-content">
            { WrappedComponent ? <WrappedComponent /> : <UserProfile /> }
          </div>
        </div>
      </div>
    )
  }

  return newComponent;
};

export default UserDashboard;