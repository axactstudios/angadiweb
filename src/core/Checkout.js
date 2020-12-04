import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { isAuth, getCookie } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart, getCart } from '../helpers/CartHelper';
import * as firebase from 'firebase';
import {Form} from 'react-bootstrap';
import '../Styles/Checkout.css';

const Checkout = ({ dm }) => {

    const [data, setData] = useState({
        address: '',
        date: '',
        time: '',
        customMessage: '',
        phone: ''
    })
    const [products, setProducts] = useState([])
    const [priiice, setpriiice] = useState(0)
    const db = firebase.firestore()
    const [availCoup, setavailCoup] = useState([])
    const [coupon, setCoupon] = useState('');

    const dis = []
    const qty = []
    const pri = []

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }

    const checkCoup = () => {
        db.collection('Offers').where('Title', '==', `${coupon}`).get()
            .then(res => {
                setpriiice(0)
                res.forEach((doc) => {
                    setavailCoup(doc.data())
                    if (doc.data() && doc.data().Title === coupon) {
                        setpriiice(doc.data().discountPercentage)
                    }
                })
            })
            .catch(err => console.error(err));
    }


    useEffect(() => {
        setProducts(getCart());
        getTotal()
    }, [dm])

    useEffect(() => {
        checkCoup()
    }, [coupon])

    const showCheckout = () => {
        return isAuth() ? (
            <div>{
                showDropIn()}</div>
        ) : (
                <Link to='/login'>
                    <button className="checkout-butt">
                        Login for checkout
                    </button>
                </Link>
            )
    }

    const showDropIn = () => {
        return (
            <div>
                {products.length > 0 ? (
                    <div>
                        <div>
                            <button className="checkout-butt">Pay Now</button>
                        </div>
                    </div>
                ) :
                    null
                }
            </div>)
    }

    return (
        // <div>
        //     <ToastContainer />

        

        // </div>
      <div>
        <ToastContainer />
        <div className="checkout-card">
          <h5 className="checkout-heads">Address</h5>
          <input type="text" placeholder="Enter house no." className="checkout-input" />
          <input type="text" placeholder="Enter street name" className="checkout-input" /> 
          <button className="checkout-butt">Saved Addresses</button>
        </div>
        <div className="checkout-card">
          <h5 className="checkout-heads">Bill</h5>
          {/* <h3 className="maincart7">Subtotal ({products.length} item):
            <p><i class="fa fa-inr"></i> <b>{getTotal() - (getTotal() * (priiice / 100))}</b></p>
            </h3> */}

          <table className="bill">
            <tr>
              <th>Sub Total</th>
              <td><i class="fa fa-inr" /> {getTotal()} </td>
            </tr>
            <tr>
              <th>Discount</th>
              <td><i class="fa fa-inr" /> {(getTotal() * (priiice / 100))}</td>
            </tr>
            <tr>
              <th>Tax @ 5%</th>
              <td><i class="fa fa-inr" /> {getTotal() * 0.05}</td>
            </tr>
            <hr />
            <tr>
              <th>Grand Total</th>
              <th><i class="fa fa-inr" /> {getTotal() * (1.05-(priiice/100))}</th>
            </tr>
          </table>

            
          <input type="text" placeholder="Promo Code" className="checkout-input" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
              
          <p>{
              availCoup && availCoup.Title === coupon
                ?
                <p style={{ color: 'green' }}>{availCoup && availCoup.code} Applied !!!</p>
                :
                <p>{coupon && <p style={{ color: 'red' }}>NOT Applied!!!</p>}</p>
          }</p>
                
            
          {
            products && products.map((k,l) => {
              dis.push(k.name)
              qty.push(k.count)
              pri.push(k.price)
            })
          }
          <div>
            {
              showCheckout()
            }
          </div> 
        </div>
        <div className="checkout-card">
          <h5 className="checkout-heads">Notes</h5>
          <textarea placeholder="Add delivery note (optional)" className="checkout-input" />
        </div>
        <div className="checkout-card">
          <h5 className="checkout-heads">Delivery Time</h5>
          <a href="changetimelinkgoeshere" className="changetime">Your delivery time is 1:31 PM. Your order will reach to you on time. Click to edit time.</a>
        </div>
        <div className="checkout-card">
          <h5 className="checkout-heads">Choose Payment Method</h5>
          <button className="checkout-butt">Cash on Delivery</button>
          <button className="checkout-butt">Proceed to pay online</button>
        </div>
      </div>
    );
}

export default Checkout;