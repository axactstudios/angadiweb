import React from 'react';
import { isAuth } from '../helpers/auth'
import '../Styles/userdash.css'
import {Link} from 'react-router-dom'

const UserDashboard = () => {

    const { Name, mail, pUrl } = isAuth()

    return (
        <div className='hwami'>
            <div className='userdash'>
                <div className='userdash1'>
                    <img src={pUrl} alt="user profile pic" />
                </div>
                <div className='userdash2'>
                    <h5>{Name}</h5>
                    <p>"We don't want to push our ideas on to
                    customers, we simply want to make what
                they want."</p>
                    <span>:- By Angadi</span>
                    <h4>{mail}</h4>
                    <Link to='/users/update/password'>Reset Password</Link>
                    <Link to='/update/profile'>Update profile</Link>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;