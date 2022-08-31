import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import OrderTable from './OrderTable';
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import '../Styles/adminPanel.css';
import Sounds from '../Assests/notif.mp3'

const columns = [
    { id: '_id', label: 'ID' },
    { id: 'Status', label: 'Status' },
    { id: 'UserID', label: 'userID' },
    { id: 'Type', label: 'Type' },
    { id: 'Address', label: 'Address' },
    { id: 'GrandTotal', label: 'Total' },
    { id: 'TimeStamp', label: 'Timestamp', format: (value) => { return new Date(value["seconds"] * 1000).toLocaleString() } },
];

const Getorder = () => {
    const [alldish, Setalldish] = useState([])
    const [dish, setDish] = useState([])
    const db = firebase.firestore()
    const [values, setValues] = useState({
        name: ''
    })


    const CheckDeliveryType = () => {
        setDish([])
        db.collection('Orders').where("Status", "==", "Processing").get()
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

    useEffect(() => {
        ActiveOrder()
    }, [])

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    };

    const handleSort = (e) => {
        if (e.target.value == 'phigh') {
            let arr = dish
            arr.sort((a, b) => {
                return b.data.GrandTotal - a.data.GrandTotal
            })
            setDish([...arr])
        } else if (e.target.value == 'plow') {
            let arr1 = dish
            arr1.sort((a, b) => {
                return a.data.GrandTotal - b.data.GrandTotal
            })
            setDish([...arr1])
        } else if (e.target.value == 'date') {
            let arr1 = dish
            arr1.sort((a, b) => {
                return b.data.TimeStamp.seconds - a.data.TimeStamp.seconds
            })
            setDish([...arr1])
        } else if (e.target.value == 'id') {
            let arr2 = dish
            arr2.sort((a, b) => {
                let id1 = parseInt(a._id.substring(5, 10))
                let id2 = parseInt(b._id.substring(5, 10))
                return id1 - id2
            })
            setDish([...arr2])
        } else {
            setDish([...dish])
        }
    }

    const getspecific = () => {
        if (values.name) {
            setDish([])
            db.collection('Orders').doc(`${values.name}`).get()
                .then(res => {
                    if (res.data()) {
                        setDish(dish => [...dish, { data: res.data(), _id: res.id }])
                    } else {
                        // newOrderr()
                        toast.error('No Order Found !!!')
                    }
                })
        } else {
            toast.error('Please Enter Name !!!')
        }
    }

    // <button className="admin-order-utility-button" onClick={newOrderr}>New Order</button>
    return (
        <div>
            <ToastContainer />

            <div className='content1'>

                <div className="admin-order-utility">
                    <div>
                        <button className="admin-order-utility-button" onClick={CheckDeliveryType}>Processing</button>
                        <button className="admin-order-utility-button" onClick={ActiveOrder}>Awaiting Confirmation</button>
                    </div>
                    <div style={{ display: "inline-flex" }}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Enter Order Id" onChange={handleChange('name')} value={values.name} />
                        </Form.Group>
                        <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                    </div>
                </div>
                <audio className="audio-element">
                    <source src={Sounds}></source>
                </audio>
                <h3 style={{ fontWeight: "bolder", margin: "1em 0" }}>All Orders
                  <div style={{ float: "right" }}>
                        <select className="item-sort" onChange={(e) => handleSort(e)}>
                            <option value="yo" selected>Default</option>
                            <option value="plow">Price Low to High</option>
                            <option value="phigh">Price High to Low</option>
                            <option value="date">Latest Date</option>
                            <option value="id">Order ID</option>
                        </select>
                    </div>
                </h3>
                <div className='ordme'>
                    <OrderTable details={dish} columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default Getorder;

    // const newOrderr = () => {
    //     setDish([])
    //     db.collection('Orders').orderBy("TimeStamp", "desc").get()
    //         .then(res => {
    //             res.forEach((doc) => {
    //                 setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
    //             })
    //         })
    // }
