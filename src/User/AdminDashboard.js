import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth';
import * as firebase from 'firebase'
import '../Styles/adminstyle.css'

const AdminDashboard = () => {

    const [totalrevanue, setTotalrevanue] = useState()
    const db = firebase.firestore()
    const [avgrat, setAvgrating] = useState()
    const [avgbasket, setavgbasketval] = useState()
    const [totalorder, setOrder] = useState()

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })

        db.collection('Orders').get()
            .then(res => {
                let x = 0
                let y = 0
                res.forEach((doc) => {
                    x += parseFloat(doc.data().GrandTotal)
                    y += 1
                })
                setavgbasketval(x / y)
                setTotalrevanue(x)
                setOrder(y)
            })

        db.collection('Reviews').get()
            .then(res => {
                let x = 0
                let y = 0
                res.forEach((doc) => {
                    x += parseFloat(doc.data().rating)
                    y += 1
                })
                setAvgrating(x / y)
            })
    })

    return (
        <div className='hwami'>
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
                    <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                    <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                    <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
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
                <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
            </div>

            <div className='content1'>
                Hello Admin
                <h2> Total Revanue - Rs {totalrevanue}</h2>
                <h2> Average Rating - {avgrat}</h2>
                <h2> Average Basket - {avgbasket}</h2>
                <h2> Total orders - {totalorder}</h2>
            </div>
        </div>
    );
};

export default AdminDashboard;
