import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Ordercard'

const Getorderfromuser = ({ match }) => {

    const [dish, setDish] = useState([])
    const db = firebase.firestore()
    const _id = match.params.userId
    const [user, serUser] = useState([])

    useEffect(() => {
        db.collection('Users').where("id", "==", `${_id}`).get()
            .then(res => {
                res.forEach((doc) => {
                    serUser(doc.data())
                })
            })
    }, [])

    const getPro = () => {
        setDish([])
        db.collection('Orders').where("UserID", "==", `${_id}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }

    return (
        <div>
            <div>
                <img src={user.pUrl} alt={user.Name} style={{ width: "300px" }} />
                <h3>{user.Name}</h3>
                <p>{user.mail}</p>
                <button onClick={getPro}> Get Product</button>
            </div>

            <div>
                {
                    dish && dish.map((d, i) => (
                        <div key={i}>
                            <Card product={d} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Getorderfromuser;