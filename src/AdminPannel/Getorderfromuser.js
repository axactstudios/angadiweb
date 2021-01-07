import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { useRouteMatch } from 'react-router-dom'
import '../Styles/adminPanel.css'
import OrderTable from './OrderTable';

const columns = [
    { id: '_id', label: 'ID' },
    { id: 'Status', label: 'Status' },
    { id: 'UserID', label: 'userID' },
    { id: 'Type', label: 'Type' },
    { id: 'Address', label: 'Address' },
    { id: 'GrandTotal', label: 'Total' },
    { id: 'TimeStamp', label: 'Timestamp', format: (value) => { return new Date(value["seconds"] * 1000).toString() } },
];

const Getorderfromuser = () => {
    let match = useRouteMatch();

    const [dish, setDish] = useState([])
    const db = firebase.firestore()
    const _id = match.params.userId
    const [user, serUser] = useState([])
    const [meko, setMeko] = useState(false)

    useEffect(() => {
        db.collection('Users').where("id", "==", `${_id}`).get()
            .then(res => {
                res.forEach((doc) => {
                    serUser(doc.data())
                })
            })
    }, [])

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const getPro = () => {
        setDish([])
        db.collection('Orders').where("UserID", "==", `${_id}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
        setMeko(true)
    }

    return (
        <div>

            <div className='content1'>

                <div className='userdash-orders'>
                    <div className='userdash1-orders'>
                        <img src={user.pUrl} alt="user profile pic" height="150px" width="150px" />
                    </div>
                    <div className='userdash2-orders'>
                        <h4>{user.Name}</h4>
                        <h6 style={{ marginBottom: "1em" }}>{user.mail}</h6>
                        <button className="admin-order-utility-button" onClick={getPro}>Get Orders</button>
                    </div>
                </div>
                <div>
                    {
                        dish.length === 0
                            ?
                            <div>
                                {
                                    meko
                                        ?
                                        <h5 style={{ textAlign: 'center' }}>No Order!!!</h5>
                                        :
                                        <h5 style={{ textAlign: 'center' }}>Plese Check the order</h5>
                                }
                            </div>
                            :
                            dish &&
                            <OrderTable details={dish} columns={columns} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Getorderfromuser;