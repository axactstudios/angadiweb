import React from 'react';
import * as firebase from 'firebase'

const Logout = () => {

    const handleClick = () => {
        firebase.auth().signOut();
    }

    return (
        <div>
            <button type="button" onClick={handleClick}>Log Out</button>
        </div>
    );
};

export default Logout;