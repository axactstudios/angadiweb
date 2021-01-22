import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import { emptyCart, getCart } from '../helpers/CartHelper';
import * as firebase from 'firebase';
import '../Styles/Checkout.css';
import { Modal, Form } from 'react-bootstrap'
// import axios from 'axios'
import Geocode from 'react-geocode'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputGroup from 'react-bootstrap/InputGroup'


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
  const [orderCOunt, setOrdercount] = useState('')
  const [nextordercount, setnextordercount] = useState('')
  const [dDate, setDate] = useState(new Date(new Date().getTime() + (3600000 * 4) + (1800000)).toISOString().substring(0, 10));
  const [timeRes, setTimeRes] = useState([])
  const [selectedTime, setSelectedTime] = useState([])

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
    serUserAddress([])
    db.collection('Users').doc(`${isAuth().id}`).collection('Address').get()
      .then(res => {
        const values = res.docs.map((a) => {
          return a.data()
        });
        serUserAddress(values)
      })
    db.collection('Ordercount').doc('ordercount').get()
      .then((res) => {
        if (res.data()) {
          setnextordercount(res.data().Numberoforders + 1)
          var opo = String(res.data().Numberoforders + 1)
          if (opo.length === 1) {
            setOrdercount("0000" + opo)
          }
          if (opo.length === 2) {
            setOrdercount("000" + opo)
          }
          if (opo.length === 3) {
            setOrdercount("00" + opo)
          }
          if (opo.length === 4) {
            setOrdercount("0" + opo)
          }
          if (opo.length === 5) {
            setOrdercount("" + opo)
          }
          if (opo.length === 6) {
            setOrdercount("0" + opo)
          }
        }
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
    db.collection('Timeslots').doc('Timeslots').get()
    .then((res) => {
      setTimeRes(res.data())
    })
  }, [])

  const cureeentLocation = () => {
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
  }

  useEffect(() => {
    cureeentLocation()
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
  }

  const handleChangee = name => e => {
    setData({ ...data, [name]: e.target.value })
  }

  const placedorder = () => {
    var y = 'ANG' + orderCOunt
    var x = "Emirate: " + selectemirate + ', Area :' + selectarea + data.address

    if (data.address && selectemirate && selectarea) {

      db.collection('Orders').doc(y).get()
        .then((res) => {
          if (res.data()) {
            toast.error('Something Went Wrong !!!')
          } else {
            db.collection('Orders').doc(y).set({
              Items: dis,
              Qty: qty,
              Price: pri,
              TimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
              GrandTotal: parseInt(getTotal() * (1.05 - (priiice / 100))) + parseInt(deliverycharge),
              Status: 'Order Placed',
              Type: 'Delivery',
              DeliveryDate: firebase.firestore.Timestamp.fromDate(new Date(dDate)),
              DeliveryTime: selectedTime,
              UserID: isAuth().id,
              Notes: data.customMessage,
              Address: x,
              orderid: y,
            }).then(() => {
              toast.success('Order done added successfully!!!')
              emptyCart(() => {
                <Redirect to='/myorder' />
              })
              db.collection('Ordercount').doc('ordercount').update({
                Numberoforders: nextordercount
              })
              setpussh(true)
            }).catch((err) => {
              toast.error('Something went wrong')
            })
          }
        })
    } else {
      toast.error('Please select Emirate and Emirate Area !!!')
    }
  }

  const handleTime = e => {
    console.log(e.target.value)
    setSelectedTime(e.target.value)
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
                <td><i class="fa fa-inr" /> {(parseInt(getTotal()) * (priiice / 100))}</td>
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

            <div>
              <Form.Control as="select" onChange={handleChangeee('selectemirate')} placeholder="Select Emirate area">
                <option>Select Emirate</option>
                {
                  emirate && emirate.map((m, l) =>
                    <option value={`${m._id}`}>{m.data.name}</option>
                  )
                }
              </Form.Control>
              <Form.Group >
                <Form.Control as="select" onChange={handleChangeee('selectarea')} placeholder="Select Emirate area" style={{ margin: "1em auto" }}>
                  <option>Select Emirate Area</option>
                  {
                    area && area.map((m, l) =>
                      <option value={`${m._id}`}>{m.data.name}</option>
                    )
                  }
                  <option value='other'>Others</option>
                </Form.Control>
              </Form.Group>
            </div>

            <div className="checkout-card">
              <input className="checkout-input" type="text" placeholder="Address" value={data.address} onChange={handleChangee('address')} />
            </div>
            <p className='sharabbi' onClick={cureeentLocation}>Get Current Location</p>

            <Form style={{ margin: "1em 0" }}>
              <InputGroup>
                <Form.Control as="select" onChange={handleChangee('address')}>
                  <option>Saved Addresses</option>
                  {
                    userAddress && userAddress.map((m, l) =>
                      <option value={`${m.address}` + `${m.hno}` + `${m.landmark}`}>{m.hno} {m.address} {m.landmark}</option>
                    )
                  }
                </Form.Control>
                <InputGroup.Append>
                  <Link to="/user/dashboard/address"><InputGroup.Text>Add New</InputGroup.Text></Link>
                </InputGroup.Append>
              </InputGroup>
            </Form>


            <div style={{ margin: "1em 0 1.5em", display: 'flex', alignItems: 'center' }}>
              <TextField
                id="date"
                type="date"
                defaultValue={dDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                error
                onChange={(e) => setDate(e.target.value)}
                label={
                  dDate < (new Date(new Date().getTime() + (3600000 * 4) + (1800000)).toISOString().substring(0, 16)) ? "Choose Valid Date" : "Schedule Delivery"
                }
              />
              <Form.Control as="select" onChange={(e) => handleTime(e)}>
                  <option>Select Time</option>
                  {
                    timeRes && timeRes.Timeslots && timeRes.Timeslots.map((m, l) =>
                      <option value={m}> {m} </option>
                    )
                  }
                </Form.Control>
            </div>

            <div >
              {minOrder &&
                parseInt(getTotal()) > parseInt(minOrder) ?
                <div style={{ display: "flex" }}>
                  <button className='checkout-butt' onClick={placedorder}>Cash on Delivery</button>
                  <button className='checkout-butt' onClick={placedorder}>Internet Banking</button>
                </div>
                :
                null
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
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Available Promo Codes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='cateegee'>
            {
              coup && coup.map((d, i) => (

                <div className="ofeecard" onClick={dkd(`${d.data.Title}`)} key={i}>
                  <img src={d.data.ImageURL} alt={d.data.Title} />
                  <div className='ofeecard1'>
                    <h5 style={{ display: "flex" }}>{d.data.Title} &nbsp;&nbsp;
                      {
                        d.data.forFirstUser && d.data.forFirstUser === true ? <p style={{ color: "tomato", float: "right" }}>First User Only</p> : null
                      }
                    </h5>
                    <p>{d.data.Subtitle}</p>
                  </div>
                  <div id="wishlist">
                    <p>{d.data.discountPercentage}% OFF</p>
                  </div>
                </div>
              ))
            }
          </div>
        </Modal.Body>
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
                <h6 style={{ color: "#78a962" }}>Congrats ! Order is Eligible</h6> :
                <p style={{ color: "tomato" }}>Minimum Purchase {minOrder && minOrder} required for {selectarea && selectarea} area</p>
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