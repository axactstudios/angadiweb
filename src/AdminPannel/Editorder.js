import React, { useEffect } from 'react';
import * as firebase from 'firebase'

const Editorder = ({ match }) => {

    const db = firebase.firestore()
    const _id = match.params.orderId

    useEffect(() => {
        db.collection('Orders').doc(_id).get()
        .then(res => {
            console.log(res.data())
        })
    },[])

    return (
        <div>
            {match.params.orderId}
        </div>
    );
};

export default Editorder;