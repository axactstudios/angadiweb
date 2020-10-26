import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Offercard'

const Getoffer = () => {

    const [dish, setDish] = useState([])
    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Offers').get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    return (
        <div>
            <h3>All Offers</h3>
            {
                dish && dish.map((d, i) => (
                    <div key={i}>
                        <Card product={d} />
                    </div>
                ))
            }
        </div>
    );
};

export default Getoffer;