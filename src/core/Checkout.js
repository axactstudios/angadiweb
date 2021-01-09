import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart, getCart } from '../helpers/CartHelper';
import * as firebase from 'firebase';
import '../Styles/Checkout.css';
import { Modal, Button, Form } from 'react-bootstrap'
import axios from 'axios'
import Geocode from 'react-geocode'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "220",
        color: 'rgb(255, 176, 0)',
        borderBottom: "none"
    },
}));

const Checkout = ({ dm }) => {
  const classes = useStyles();

  const [data, setData] = useState({
    address: '',
    customMessage: ''
  })

  const [products, setProducts] = useState([])
  const [priiice, setpriiice] = useState(0)
  const db = firebase.firestore()
  const [availCoup, setavailCoup] = useState([])
  const [coupon, setCoupon] = useState('');
  const [puush, setpussh] = useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  const [coup, setcoup] = useState([])
  const [area, setarea] = useState([])
  const [emirate, setEmirate] = useState([])
  const [deliverycharge, setdeliverycharge] = useState('')
  const [minOrder, setminOrder] = useState('')
  const [selectarea, setselectarea] = useState('')
  const [selectemirate, setselectemirate] = useState('')
  const [userAddress, serUserAddress] = useState([])

  const [dDate, setDate] = useState(new Date(new Date().getTime() + (3600000*4) + (1800000)).toISOString().substring(0,16));

  if (typeof window !== 'undefined' ) {
    localStorage.setItem('schedule date', dDate);
  }

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
    setarea([])
    db.collection('EmiratesArea').get()
      .then(res => {
        res.forEach((doc) => {
          setarea(dish => [...dish, { data: doc.data(), _id: doc.id }])
        })
      })
    setEmirate([])
    db.collection('Emirates').get()
      .then(res => {
        res.forEach((doc) => {
          setEmirate(dish => [...dish, { data: doc.data(), _id: doc.id }])
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

  useEffect(() => {
    serUserAddress([])
    db.collection('Users').doc(`${isAuth().id}`).collection('Address').get()
      .then(res => {
        // res.forEach(doc => {
        //   console.log(doc.id, ' => ', doc.data())
        // })
        console.log(res)
      })
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' })
        .then((res) => {
          // if (res.state === 'granted') {
          // console.log(res.state)
          navigator.geolocation.getCurrentPosition(function (position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            Geocode.setApiKey('AIzaSyAXFXYI7PBgP9KRqFHp19_eSg-vVQU-CRw')
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
              async ress => {
                const address = await ress.results[0].formatted_address;
                //                const address1 = await ress.results[0].address_components[3].long_name;
                setData({ ...data, address: address })
              }
            )
          })
          // } else if (res.state === 'prompt') {
          //     console.log(res.state)
          // } else if (res.state === 'denied') {
          //     console.log(res.state)
          // }
        })
    } else {
      toast.error('Geolocation is not supported')
    }
  }, [])


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

  const handleChangeee = name => e => {
    if (name === 'selectemirate') {
      if (selectarea) {
        if (selectarea === 'other') {
          db.collection('Emirates').doc(`${e.target.value}`).get()
            .then((res) => {
              if (res.data()) {
                setselectemirate(res.data().name)
                setdeliverycharge(res.data().deliveryCharge)
                setminOrder(res.data().minOrderPrice)
              }
            })
        } else {
          db.collection('Emirates').doc(`${e.target.value}`).get()
            .then((res) => {
              if (res.data()) {
                setselectemirate(res.data().name)
              }
            })
        }
      } else {
        db.collection('Emirates').doc(`${e.target.value}`).get()
          .then((res) => {
            if (res.data()) {
              setselectemirate(res.data().name)
              setdeliverycharge(res.data().deliveryCharge)
              setminOrder(res.data().minOrderPrice)
            }
          })
      }
    } else if (name === 'selectarea') {
      db.collection('EmiratesArea').doc(`${e.target.value}`).get()
        .then((res) => {
          if (res.data()) {
            setselectarea(res.data().name)
            setdeliverycharge(res.data().deliveryCharge)
            setminOrder(res.data().minOrderPrice)
          } else {
            setselectarea('other')
          }
        })
    }
    console.log(deliverycharge, minOrder, selectarea)
  }

  const handleChangee = name => e => {
    setData({ ...data, [name]: e.target.value })
  }

  const handleDate = (e) => {
    setDate(e.target.value)
    if (typeof window !== 'undefined' ) {
      localStorage.setItem('schedule date', dDate);
    }
  }

  const placedorder = () => {

    if (data.address && selectemirate && selectarea) {
      db.collection('Orders').add({
        Items: dis,
        Qty: qty,
        Price: pri,
        TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        GrandTotal: getTotal() - (getTotal() * (priiice / 100)),
        Status: 'Order Placed',
        Type: 'Delivery',
        DeliveryDate: '45',
        DeliveryTime: '55',
        UserID: isAuth().id,
        Notes: data.customMessage,
        Address: data.address,
        orderid: 'AIIFJKKR',
      }).then(() => {
        toast.success('Order done added successfully!!!')
        emptyCart(() => {
          <Redirect to='/myorder' />
        })
        setpussh(true)
      }).catch((err) => {
        toast.error('Something went wrong')
      })
    } else {
      toast.error('Please select Emirate and Emirate Area !!!')
    }
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
              <tr>
                <th>Charges - </th>
                <td><i class="fa fa-inr" /> {deliverycharge && deliverycharge}</td>
              </tr>
              <hr />
              <tr>
                <th>Grand Total - </th>
                {deliverycharge ?
                  <th> <i class="fa fa-inr" />{parseInt(getTotal() * (1.05 - (priiice / 100))) + parseInt(deliverycharge)}</th>
                  :
                  <th> <i class="fa fa-inr" />{parseInt(getTotal() * (1.05 - (priiice / 100)))}</th>
                }
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

            <div style={{display: "flex", justifyContent: "space-evenly"}}>
              <Form.Group >
                <Form.Label>Emirate Area</Form.Label><br />
                <select onChange={handleChangeee('selectarea')} >
                  <option>Please Select</option>
                  {
                    area && area.map((m, l) =>
                      <option value={`${m._id}`}>{m.data.name}</option>
                    )
                  }
                  <option value='other'>Others</option>
                </select>
              </Form.Group>
              <Form.Group >
                <Form.Label>Emirate</Form.Label><br />
                <select onChange={handleChangeee('selectemirate')} >
                  <option>Please Select</option>
                  {
                    emirate && emirate.map((m, l) =>
                      <option value={`${m._id}`}>{m.data.name}</option>
                    )
                  }
                </select>
              </Form.Group>
            </div>

            <div className="checkout-card">
              <input className="checkout-input" type="text" placeholder="Address" value={data.address} onChange={handleChangee('address')} />
            </div>

            <div style={{margin: "1em 0 1.5em"}}>
              <TextField
                  id="datetime-local"
                  label="Schedule Delivery"
                  type="datetime-local"
                  defaultValue={dDate}
                  className={classes.textField}
                  InputLabelProps={{
                      shrink: true,
                  }}
                  onChange={(e) => handleDate(e)}
              />
            </div>

            <div >
              { minOrder &&
                parseInt(getTotal()) > parseInt(minOrder) ?
                <div style={{display: "flex"}}>
                  <button className='checkout-butt' onClick={placedorder}>Cash on Delivery</button>
                  <button className='checkout-butt' onClick={placedorder}>Internet Banking</button>
                </div>
                 :
                <p style={{color: "tomato"}}>Order not eligible for {selectarea && selectarea}</p>
              }
            </div>

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
          products ?
          <div>
          {minOrder && parseInt(getTotal()) > parseInt(minOrder) ?
            <h6 style={{color: "#78a962"}}>Congrats ! Order is Eligible</h6> :
            <p style={{color: "tomato"}}>Minimum Purchase {minOrder && minOrder} required for {selectarea && selectarea} area</p>
          }
          </div> 
           : null
        }
        
      </div>
      <div>
        {
          showCheckout()
        }
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {JSON.stringify(userAddress)}
    </div>
  );
}

export default Checkout;

// // 73 + 3.5 +48.5
// <button onClick={orderrrr}>dd</button>

// const orderrrr = () => {
//   // https://paytab.herokuapp.com/pay
//   axios
//     .post("http://localhost:5000/pay", {
//       Items: dis,
//       Qty: qty,
//       Price: pri,
//       TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
//       GrandTotal: getTotal() - (getTotal() * (priiice / 100)),
//       Status: 'Order Placed',
//       Type: 'Delivery',
//       DeliveryDate: '45',
//       DeliveryTime: '55',
//       UserID: isAuth().id,
//       Notes: data.customMessage,
//       Address: data.address,
//       orderid: 'AIIFJKKR',
//     })
//     .then(res => {
//       console.log(res.data)
//       window.open(res.data.payment_url)
//     }
//       // if(res.data.payment_url){
//       // open(res.data.payment_url)
//       // }
//     )
//     .catch(err => console.error(err));
// }