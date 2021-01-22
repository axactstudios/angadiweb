import React, { useEffect, useState } from 'react';
import firebase from 'firebase'

const Timeslot = () => {
    const [res,setres] = useState([])
    const [ress,setress] = useState([])
    const db = firebase.firestore()

    useEffect(() =>{
        db.collection('Timeslots').doc('Timeslots').get()
        .then((ress) => {
            setres(ress.data())
            setress(ress.data().Timeslots)
        })
    },[])

    return (
        <div className='content1'>
        {JSON.stringify(res)}        
        {JSON.stringify(ress)}
        <div>
        {ress.map((d) => (
            <h5>{d}</h5>
        ))}
        </div>
        </div>
    );
};

export default Timeslot;