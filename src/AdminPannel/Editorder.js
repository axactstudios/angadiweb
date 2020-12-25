import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'

const Editorder = ({ match }) => {
    const [values, setValues] = useState({})
    const db = firebase.firestore()
    const _id = match.params.orderId
    const [status, setStatus] = useState('');

    const getsome = () => {
        db.collection('Orders').doc(_id).get()
            .then(res => {
                setValues(res.data())
                setStatus(res.data().Status)
            })
    }

    useEffect(() => {
        db.collection('Orders').doc(_id).get()
            .then(res => {
                setValues(res.data())
                setStatus(res.data().Status)
            })
    }, [])

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const handleSubmit = () => {
        db.collection('Orders').doc(_id).update({
            Status: status
        }).then(() => {
            console.log('done')
            toast.success('Status Changed Successfully !!!')
            getsome()
        }).catch((err) => {
            console.log(err)
            toast.error('Something Went wrong !!!')
        })
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
                {
                    values &&
                    <div>
                        <input value={values.Status} />
                        <select onChange={(e) => { setStatus(e.target.value) }}>
                            <option>Please Select</option>
                            <option value={'Awaiting Confirmation'}>Processing</option>
                            <option value={'In Route'}>On The Way</option>
                            <option value={'Order Delivered'}>Order Delivered</option>
                            <option value={'Cancelled'}>Cancelled</option>
                        </select>
                        <div>Address - {values.Address}</div>
                        <div>GrandTotal -{values.GrandTotal}</div>
                        <div>Status -{values.Status}</div>
                        <div>Type -{values.Type}</div>
                        <div>UserID -{values.UserID}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <div>Dishes : {values.Items && values.Items.map((d) => (
                                <p>{d}</p>
                            ))}</div>
                            <div>Quantity : {values.Qty && values.Qty.map((d) => (
                                <p>{d}</p>
                            ))}</div>
                            <div>Price : {values.Price && values.Price.map((d) => (
                                <p>{d}</p>
                            ))}</div>
                        </div>
                        <div>OrderId -{_id}</div>
                        <div>{values.DeliveryTime}</div>
                        <button onClick={handleSubmit}>Change Status</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Editorder;

// <div>{values.TimeStamp.seconds && <p>Timestamp -{new Date(values.TimeStamp.seconds * 1000).toLocaleDateString("en-US")}</p>}</div>

