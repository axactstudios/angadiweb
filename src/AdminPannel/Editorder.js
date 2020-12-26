import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/adminPanel.css';
import {Form} from 'react-bootstrap'

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
                {
                    values &&
                    <div>
                      <div style={{display: "flex", justifyContent: "center", margin: "1em 0"}}>
                        <Form.Control type="text" value={values.Status} style={{width: "400px"}}/>
                        <select className="admin-order-utility-button" onChange={(e) => { setStatus(e.target.value) }}>
                            <option>Please Select</option>
                            <option value={'Awaiting Confirmation'}>Processing</option>
                            <option value={'In Route'}>On The Way</option>
                            <option value={'Order Delivered'}>Order Delivered</option>
                            <option value={'Cancelled'}>Cancelled</option>
                        </select>
                        <button className="admin-order-utility-button" onClick={handleSubmit}>Change Status</button>
                      </div>
                        <table style={{width: "100%"}} className="edit-order-table">
                          <tr>
                            <th><i class="fa fa-tag" /> &nbsp; Order Id</th>
                            <th><i class="fa fa-spinner" /> &nbsp; Status</th>
                            <th><i class="fa fa-clock-o" /> &nbsp; Delivery Time</th>
                          </tr>
                          <tr>
                            <td>{_id}</td>
                            <td>{values.Status}</td>
                            <td>{values.DeliveryTime}</td>
                          </tr>
                          <tr>
                            <th><i class="fa fa-map-marker" /> &nbsp; Deliver to</th>
                            <th><i class="fa fa-taxi" /> &nbsp; Type</th>
                            <th><i class="fa fa-file-o" /> &nbsp; Grand Total</th>
                          </tr>
                          <tr>
                            <td>{values.Address}</td>
                            <td>{values.Type}</td>
                            <td>{values.GrandTotal}</td>
                          </tr>
                        </table>
                        <div style={{fontWeight: "bolder", margin: "1em 0"}}>UserID -{values.UserID}</div>
                        <div className="edit-order-data">
                            <div><h6>Dishes</h6> {values.Items && values.Items.map((d) => (
                                <p>{d}</p>
                            ))}
                            <p>Tax</p>
                            </div>
                            <div><h6>Quantity</h6> {values.Qty && values.Qty.map((d) => (
                                <p>{d}</p>
                            ))}
                            <p>@ 5%</p>
                            </div>
                            <div><h6>Price</h6> {values.Price && values.Price.map((d) => (
                                <p>{d}</p>
                            ))}
                            <p>{(values.GrandTotal * 0.05).toFixed(2)}</p>
                            </div> 
                        </div>
                        
                    </div>
                }
            </div>
        </div>
    );
};

export default Editorder;

// <div>{values.TimeStamp.seconds && <p>Timestamp -{new Date(values.TimeStamp.seconds * 1000).toLocaleDateString("en-US")}</p>}</div>

