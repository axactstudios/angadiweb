import React, { useState } from 'react';
import firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'


const Addemirates = () => {

    const [values, setValues] = useState({
        name: '',
        minOrderPrice: '',
        deliveryCharge: ''
    })

    const { name, minOrderPrice, deliveryCharge } = values

    const db = firebase.firestore()

    const handlechange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const handleSubmit = () => {
        if (deliveryCharge && minOrderPrice && minOrderPrice) {
            db.collection('Emirates').add({
                name: name,
                minOrderPrice: minOrderPrice,
                deliveryCharge: deliveryCharge
            }).then(() => {
                toast.success('Emirates Added !!!')
                setValues({ ...values, name: '', minOrderPrice: ' ', deliveryCharge: '' })
            }).catch((err) => {
                toast.error('Something went wrong !!!')
            })
        } else {
            toast.error('Please Fill all fields')
        }
    }

    return (
        <div>
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

            <div  className='content1'>
                <ToastContainer />
                <Form.Group>
                    <Form.Label>Emirates Name</Form.Label><br />
                    <Form.Control type='text' placeholder="Enter Emirate Name" value={name} onChange={handlechange('name')} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Minimum Order Price</Form.Label><br />
                    <Form.Control type='text' placeholder="Enter Minimum Order Price" value={minOrderPrice} onChange={handlechange('minOrderPrice')} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Delivery Charge</Form.Label><br />
                    <Form.Control type='text' placeholder="Enter Delivery Charges" value={deliveryCharge} onChange={handlechange('deliveryCharge')} />
                </Form.Group>
                <Button onClick={handleSubmit}>Add Brands</Button>
            </div>
        </div>
    );
};

export default Addemirates;