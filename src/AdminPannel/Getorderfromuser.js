import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import Card from '../Csshelper/Ordercard'
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

const Getorderfromuser = ({ match }) => {

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