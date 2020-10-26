import React from 'react';
import {isAuth} from '../helpers/auth'

const UserDashboard = () => {

    const {Name, mail, pUrl} = isAuth()

    return (
        <div>
            <img src={pUrl} alt="user profile pic"/>
            <h5>{Name}</h5>
            <h5>{mail}</h5>
        </div>
    );
};

export default UserDashboard;