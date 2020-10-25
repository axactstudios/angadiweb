import React, { useEffect } from 'react';
import Log from '../User/Logout'
import * as firebase from 'firebase'

const Home = () => {

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user)
            } else {
                console.log('No user found')
            }
        })
    }, [])
    
    return (
        <div>
            <Log />
           Home
        </div>
    );
};

export default Home;