import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import OrderTable from './OrderTable';
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import '../Styles/adminPanel.css';

const columns = [
    { id: 'pUrl', label: "User Profile", format: (value) => <img src={value} height="70px" width="70px" /> },
    { id: 'Name', label: 'Name', maxWidth: "30%" },
    { id: 'id', label: 'User ID' },
    { id: 'mail', label: 'Email' },
    { id: 'role', label: 'Role' }
];

const Getuser = () => {

    const [values, setValues] = useState({
        name: '',
        category: '',
        emaiil: ''
    })
    const [dish, setDish] = useState([])
    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Users').get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
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

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    };

    const getspecific = () => {
        if (values.name == '' && values.emaiil == '') {
            toast.error('Enter Name or Email')
        } else {
            if (values.name && values.emaiil == '') {
                setDish([])
                db.collection('Users').where("mail", "==", `${values.name}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setDish([{ data: doc.data(), _id: doc.id }])
                        })
                    })
            }
            else if (values.emaiil && values.name == '') {
                setDish([])
                db.collection('Users').where("Name", "==", `${values.emaiil}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setDish([{ data: doc.data(), _id: doc.id }])
                        })
                    })
            } else if (values.emaiil && values.name) {
                setDish([])
                db.collection('Users')
                    .where("Name", "==", `${values.emaiil}`)
                    .where("mail", "==", `${values.name}`)
                    .get()
                    .then(res => {
                        res.forEach((doc) => {
                            setDish([{ data: doc.data(), _id: doc.id }])
                        })
                    })
            } else {
                console.log('Nice !!!')
            }
        }
    }

    return (
        <div>
            <ToastContainer />
            <div className="admin-panel-header">
                <h5>Angadi.ae</h5>
                <h2>Admin Panel</h2>
                <button><i class="fa fa-power-off" />  Logout</button>
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
                <h2 style={{ margin: "0.4em 0", fontWeight: "bold" }}>All Users</h2>
                <div className="adpor">
                    <Form.Group className="adpor1">
                        <Form.Control type="text" placeholder="Enter User Email" onChange={handleChange('name')} value={values.name} />
                    </Form.Group>
                    <Form.Group className="adpor1">
                        <Form.Control type="text" placeholder="Enter User Name" onChange={handleChange('emaiil')} value={values.emaiil} />
                    </Form.Group>
                    <div className="adpor3">
                        <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                    </div>
                </div>
                <OrderTable details={dish} columns={columns} />
            </div>
        </div>
    );
};

export default Getuser;