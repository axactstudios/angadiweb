import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart, getCart } from '../helpers/CartHelper';
import * as firebase from 'firebase';
import '../Styles/Checkout.css';
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'

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
  const [puush, setpussh] = useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  const [coup, setcoup] = useState([])

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
    setcoup([])
    db.collection('Offers').get()
      .then(res => {
        res.forEach((doc) => {
          setcoup(dish => [...dish, { data: doc.data(), _id: doc.id }])
        })
      })
  }, [])

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

  const handleChangee = name => e => {
    setData({ ...data, [name]: e.target.value })
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
      emptyCart(() => {
        <Redirect to='/myorder' />
      })
      setpussh(true)
    }).catch((err) => {
      toast.error('Something went wrong')
      console.log(err)
    })

  }

  const showDropIn = () => {
    return (
      <div>
        {products.length > 0 ? (
          <div className='checky2'>
            <h5>Bill</h5>
            {/* <h3 className="maincart7">Subtotal ({products.length} item):
                <p><i class="fa fa-inr"></i> <b>{getTotal() - (getTotal() * (priiice / 100))}</b></p>
                </h3> */}

            <table className="bill">
              <tr>
                <th>Sub Total - </th>
                <td><i class="fa fa-inr" /> {getTotal()} </td>
              </tr>
              <tr>
                <th>Discount - </th>
                <td><i class="fa fa-inr" /> {(getTotal() * (priiice / 100))}</td>
              </tr>
              <tr>
                <th>Tax @ 5% - </th>
                <td><i class="fa fa-inr" /> {getTotal() * 0.05}</td>
              </tr>
              <hr />
              <tr>
                <th>Grand Total - </th>
                <th> <i class="fa fa-inr" />{getTotal() * (1.05 - (priiice / 100))}</th>
              </tr>
            </table>

            <input className="checkout-input" type="text" placeholder="Promo Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <p className='sharabbi' onClick={() => setModalShow(true)}>Promo Code</p>
            <p>{
              availCoup && availCoup.Title === coupon
                ?
                <p style={{ color: 'green' }}>{availCoup && availCoup.code} Applied !!!</p>
                :
                <p>{coupon && <p style={{ color: 'red' }}>NOT Applied!!!</p>}</p>
            }</p>


            <div className="checkout-card">
              <input className="checkout-input" type="text" placeholder="Address" value={data.address} onChange={handleChangee('address')} />
              <input className="checkout-input" type="text" placeholder="Contact Number" value={data.phone} onChange={handleChangee('phone')} />
            </div>
            <button className='checkout-butt' onClick={placedorder}>Pay Now</button>

            <div>
              <h5>Special Notes</h5>
              <textarea placeholder="Add delivery note (optional)" className="checkout-input" value={data.customMessage} onChange={handleChangee('customMessage')} />
            </div>
          </div>
        ) :
          null
        }
      </div>)
  }

  const orderrrr = () => {
    // https://paytab.herokuapp.com/pay
    axios
      .post("https://paytab.herokuapp.com/pay", {
        price: 250
      })
      .then(res =>{
        console.log(res.data)
        window.open(res.data.payment_url)
      }
        // if(res.data.payment_url){
        // open(res.data.payment_url)
        // }
      )
      .catch(err => console.error(err));
  }

  const dkd = (ll) => (e) => {
    e.preventDefault()
    setCoupon(ll)
    setModalShow(false)
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Promo Codes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 style={{ textAlign: 'center' }}>All Offers</h2>
          <div className='cateegee'>
            {
              coup && coup.map((d, i) => (
                <div key={i}>
                  <div className="ofeecard" onClick={dkd(`${d.data.Title}`)}>
                    <img src={d.data.ImageURL} alt={d.data.Title} />
                    <div className='ofeecard1'>
                      <h6>{d.data.Title}</h6>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className='checky'>
      <ToastContainer />
      <h4 className='checky1'>Your cart summary</h4>
      {
        products && products.map((k, l) => {
          dis.push(k.name)
          qty.push(k.count)
          pri.push(k.price)
        })
      }
      {
        puush ? <Redirect to='/user/dashboard/myorders' />
          :
          null
      }
      <div>
        {
          showCheckout()
        }
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <button onClick={orderrrr}>dd</button>
    </div>
  );
}

export default Checkout;