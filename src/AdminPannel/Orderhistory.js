import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import OrderTable from './OrderTable';
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import '../Styles/adminPanel.css';

const columns = [
    { id: '_id', label: 'ID' },
    { id: 'Status', label: 'Status' },
    { id: 'UserID', label: 'userID' },
    { id: 'Type', label: 'Type' },
    { id: 'Address', label: 'Address' },
    { id: 'GrandTotal', label: 'Total' },
    { id: 'TimeStamp', label: 'Timestamp', format: (value) => { return new Date(value["seconds"] * 1000).toString() } },
];

const Getorder = () => {
    const [dish, setDish] = useState([])
    const db = firebase.firestore()
    const [values, setValues] = useState({
        name: ''
    })
    const newOrderr = () => {
        setDish([])
        db.collection('Orders').orderBy("TimeStamp", "desc").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }

    useEffect(async () => {
        await newOrderr()
    }, [])

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const checkDeliverd = () => {
        setDish([])
        db.collection('Orders').where("Status", "==", "Order Delivered").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                    console.log(doc.data())
                })
            })
    }

    const CheckDeliveryType = () => {
        setDish([])
        db.collection('Orders').where("Status", "==", "Cancelled").get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                    console.log(doc.data())
                })
            })
    }

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    };

    const getspecific = () => {
        if (values.name) {
            setDish([])
            db.collection('Orders').doc(`${values.name}`).get()
                .then(res => {
                    if (res.data()) {
                        setDish(dish => [...dish, { data: res.data(), _id: res.id }])
                    } else {
                        newOrderr()
                        toast.error('No Order Found !!!')
                    }
                })
        } else {
            toast.error('Please Enter Name !!!')
        }
    }

    return (
        <div>
            <ToastContainer />

            <div className='content1'>

                <div className="admin-order-utility">
                    <div>
                        <button className="admin-order-utility-button" onClick={newOrderr}>All Orders</button>
                        <button className="admin-order-utility-button" onClick={checkDeliverd}>Order Delivered</button>
                        <button className="admin-order-utility-button" onClick={CheckDeliveryType}>Canceled Order</button>
                    </div>
                    <div style={{ display: "inline-flex" }}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter Order Id" onChange={handleChange('name')} value={values.name} />
                        </Form.Group>
                        <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                    </div>
                </div>

                <h3 style={{ fontWeight: "bolder", margin: "1em 0" }}>All Orders</h3>
                <div className='ordme'>
                    <OrderTable details={dish} columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default Getorder;