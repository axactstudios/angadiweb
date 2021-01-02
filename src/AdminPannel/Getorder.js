import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Ordercard'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
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
  { id: 'TimeStamp', label: 'Timestamp', format: (value) => { return new Date(value["seconds"]*1000).toString()} },
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
      
          <div className="admin-panel-header">
              <h5>Angadi.ae</h5>
              <h2>Admin Panel</h2>
              <button><i class="fa fa-power-off"/>  Logout</button>
            </div>

            

            <div class="mobile_nav">
                <div class="nav_bar">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="mobile_profile_image" alt="" />
                    <i class="fa fa-bars nav_btn"></i>
                </div>
                <div class="mobile_nav_items">
                    <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                    <Link className="admin1" to='/get/orders'><i class="fa fa-cutlery"></i>orders</Link>
                    <Link className="admin1" to='/get/dishes'><i class="fa fa-glass"></i>dishes</Link>
                    <Link className="admin1" to='/get/category'><i class="fa fa-coffee"></i>category</Link>
                    <Link className="admin1" to='/get/offers'><i class="fa fa-tag"></i>Offers</Link>
                    <Link className="admin1" to='/get/users'><i class="fa fa-user"></i>Users</Link>
                    <Link className="admin1" to='/get/area'><i class="fa fa-user"></i>Emirates</Link>
                    <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                    <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                    <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
                    <Link className="admin1" to='/add/emirates'><i class="fa fa-plus-square"></i>add Emirates</Link>
                    <Link className="admin1" to='/add/area'><i class="fa fa-plus-square"></i>add Emiratesarea</Link>
                </div>
            </div>
            <div class="sidebar">
                <div class="profile_info">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="profile_image" alt="" />
                    <h4>{isAuth().Name}</h4>
                </div>
                <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                <Link className="admin1" to='/get/orders'><i class="fa fa-cutlery"></i>orders</Link>
                <Link className="admin1" to='/get/dishes'><i class="fa fa-glass"></i>dishes</Link>
                <Link className="admin1" to='/get/category'><i class="fa fa-coffee"></i>category</Link>
                <Link className="admin1" to='/get/offers'><i class="fa fa-tag"></i>Offers</Link>
                <Link className="admin1" to='/get/users'><i class="fa fa-user"></i>Users</Link>
                <Link className="admin1" to='/get/area'><i class="fa fa-user"></i>Emirates</Link>
                <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
                <Link className="admin1" to='/add/emirates'><i class="fa fa-plus-square"></i>add Emirates</Link>
                <Link className="admin1" to='/add/area'><i class="fa fa-plus-square"></i>add Emiratesarea</Link>
            </div>

            <div className='content1'>
         
                <div className="admin-order-utility">
                  <div>
                    <button className="admin-order-utility-button" onClick={newOrderr}>New Order</button>
                    <button className="admin-order-utility-button" onClick={checkDeliverd}>Order Delivered</button>
                    <button className="admin-order-utility-button" onClick={CheckDeliveryType}>In Route</button>
                    <button className="admin-order-utility-button" onClick={ActiveOrder}>Awaiting Confirmation</button>
                  </div>
                  <div style={{display:"inline-flex"}}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={values.name} />
                    </Form.Group>
                    <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                  </div>
                </div>

                <h3 style={{fontWeight: "bolder", margin: "1em 0"}}>All Orders</h3>
                <div className='ordme'>
                    <OrderTable details={dish} columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default Getorder;