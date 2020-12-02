import React from 'react';
import * as firebase from 'firebase'
import { signout } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/userdash.css'

const Logout = () => {

    const handleClick = () => {
        firebase.auth().signOut();
        signout(() => {
            toast.success('Signout Successfully');
        })
    }

    return (
        <div>
            <ToastContainer />
            <button type="button" className="dashboard-nav-link" onClick={handleClick}>Log Out</button>
        </div>
    );
};

export default Logout;