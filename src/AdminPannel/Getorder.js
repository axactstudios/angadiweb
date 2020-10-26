import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Ordercard'

const Getorder = () => {
    const [dish, setDish] = useState([])
    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Orders').orderBy("TimeStamp", "desc").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    const checkDeliverd = () => {
        setDish([])
        db.collection('Orders').where("Status", "==", "Order Placed").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                    console.log(doc.data())
                })
            })
    }

    const CheckDeliveryType = () => {
        setDish([])
        db.collection('Orders').where("Type", "==", "Delivery").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                    console.log(doc.data())
                })
            })
    }

    const ActiveOrder = () => {
        setDish([])
        db.collection('Orders').where("Status", "==", "Awaiting Confirmation").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                    console.log(doc.data())
                })
            })
    }


    return (
        <div>
            <button onClick={checkDeliverd}>Order Placed</button>
            <button onClick={CheckDeliveryType}>Order Type</button>
            <button onClick={ActiveOrder}>Awaiting Confirmation</button>
            <h3>All Order Ordered by New Arrivals</h3>
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

export default Getorder;