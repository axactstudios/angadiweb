import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart, getCart } from '../helpers/CartHelper';
import * as firebase from 'firebase';
import { Form } from 'react-bootstrap'

const Checkout = ({ dm }) => {

    const [data, setData] = useState({
        address: '',
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

    // snapshot.updateTime,

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
                    <button>
                        sign in for checkout
                    </button>
                </Link>
            )
    }

    const placedorder = () => {
        db.collection('Orders').add({
            Items: dis,
            Qty: qty,
            Price: pri,
            TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
            GrandTotal: getTotal() - (getTotal() * (priiice / 100)),
            Status: 'Order Placed',
            Type: 'Delivery',
            UserID: isAuth().id,
            Notes: data.customMessage,
            Address: data.address,
            Phone: data.phone
        }).then(() => {
            toast.success('Order done added successfully!!!')
        }).catch((err) => {
            toast.error('Something went wrong')
            console.log(err)
        })
    }

    const showDropIn = () => {
        return (
            <div>
                {products.length > 0 ? (
                    <div>
                        <div>
                            <button onClick={placedorder}>Pay Now</button>
                        </div>
                    </div>
                ) :
                    null
                }
            </div>)
    }


    return (
        <div>
            <ToastContainer />

            <h3 className="maincart7">Subtotal ({products.length} item):
            <p><i class="fa fa-inr"> </i><b>{getTotal() - (getTotal() * (priiice / 100))}</b></p>
            </h3>
            <div className="card4">
                <Form.Control type="text" placeholder="Promo Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                <div className="coup">
                    <p>Promo Code</p>
                    <p className="coup1">{
                        availCoup && availCoup.Title === coupon
                            ?
                            <p style={{ color: 'green' }}>{availCoup && availCoup.code} Applied !!!</p>
                            :
                            <p>{coupon && <p style={{ color: 'red' }}>NOT Applied!!!</p>}</p>
                    }</p>
                </div>
            </div>
            {
                products && products.map((k, l) => {
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
    );
}

export default Checkout;