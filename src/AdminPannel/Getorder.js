import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Ordercard'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';

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
        db.collection('Orders')
            .onSnapshot(res => {
                let x = 0
                res.forEach((doc) => {
                    x += 1
                })
                if (x > dish.length) {
                    toast.success('new order!!!')
                } if (x == dish.length) {
                    toast.success('order status changed')
                }
            })
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
        db.collection('Orders').where("Status", "==", "In Route").get()
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

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    };

    const getspecific = () => {
        if(values.name){
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
        }else{
            toast.error('Please Enter Name !!!')
        }
    }

    return (
        <div>
            <ToastContainer />
            <div class="mobile_nav">
                <div class="nav_bar">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="mobile_profile_image" alt="" />
                    <i class="fa fa-bars nav_btn"></i>
                </div>
                <div class="mobile_nav_items">
                    <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                    <Link className="admin1" to='/get/orders'><i class="fa fa-desktop"></i>orders</Link>
                    <Link className="admin1" to='/get/dishes'><i class="fa fa-desktop"></i>dishes</Link>
                    <Link className="admin1" to='/get/category'><i class="fa fa-desktop"></i>category</Link>
                    <Link className="admin1" to='/get/offers'><i class="fa fa-desktop"></i>Offers</Link>
                    <Link className="admin1" to='/get/users'><i class="fa fa-desktop"></i>Users</Link>
                    <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>add category</Link>
                    <Link className="admin1" to='/add/dish'><i class="fa fa-desktop"></i>add dish</Link>
                    <Link className="admin1" to='/add/offer'><i class="fa fa-desktop"></i>add offer</Link>
                </div>
            </div>

            <div class="sidebar">
                <div class="profile_info">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="profile_image" alt="" />
                    <h4>{isAuth().Name}</h4>
                </div>
                <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                <Link className="admin1" to='/get/orders'><i class="fa fa-desktop"></i>orders</Link>
                <Link className="admin1" to='/get/dishes'><i class="fa fa-desktop"></i>dishes</Link>
                <Link className="admin1" to='/get/category'><i class="fa fa-desktop"></i>category</Link>
                <Link className="admin1" to='/get/offers'><i class="fa fa-desktop"></i>Offers</Link>
                <Link className="admin1" to='/get/users'><i class="fa fa-desktop"></i>Users</Link>
                <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>add category</Link>
                <Link className="admin1" to='/add/dish'><i class="fa fa-desktop"></i>add dish</Link>
                <Link className="admin1" to='/add/offer'><i class="fa fa-desktop"></i>add offer</Link>
            </div>

            <div className='content1'>
                <button onClick={newOrderr}>New Order</button>
                <button onClick={checkDeliverd}>Order Delivered</button>
                <button onClick={CheckDeliveryType}>In Route</button>
                <button onClick={ActiveOrder}>Awaiting Confirmation</button>
                <Form.Group>
                    <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={values.name} />
                </Form.Group>
                <div className="adpor3">
                    <button onClick={getspecific}>Search</button>
                </div>

                <h3>All Orders</h3>
                <div className='ordme'>
                    {
                        dish && dish.map((d, i) => (
                            <div key={i}>
                                <Card product={d} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Getorder;