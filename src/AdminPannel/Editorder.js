import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { useRouteMatch, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/adminPanel.css';
import { jsPDF } from 'jspdf'
import MapPicker from 'react-google-map-picker'
import Geocode from 'react-geocode'
import { Modal, Form } from 'react-bootstrap'

const Editorder = () => {
    let match = useRouteMatch();
    const [values, setValues] = useState({})
    const db = firebase.firestore()
    const _id = match.params.orderId
    const [status, setStatus] = useState('');
    const [modalShow, setModalShow] = React.useState(false);

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

    let { Address } = values;
    Address = " " + Address;
    Address = Address.toString().slice(25, Address.length)
    const [location, setloc] = useState({ lat: 0, lng: 0 })

      Geocode.setApiKey('AIzaSyAXFXYI7PBgP9KRqFHp19_eSg-vVQU-CRw')
      if(modalShow) {
        Geocode.fromAddress(Address).then(
          async response => {
            const { lat, lng } = await response.results[0].geometry.location;
            console.log(lat, lng);
            setloc({lat: lat, lng: lng})
          }
        )
      } 

    const handleSubmit = () => {
        db.collection('Orders').doc(_id).update({
            Status: status
        }).then(() => {
            console.log('done')
            toast.success('Status Changed Successfully !!!')
            getsome()
            db.collection('Notifications').add({
                UserID: values.UserID,
                OrderID: _id,
                Notification: `Order Placed. ${status}.`,
                DeliveryDate: values.DeliveryDate,
                DeliveryTime: values.DeliveryTime,
                TimeStamp: values.TimeStamp,
                GrandTotal: values.GrandTotal,
            });
        }).catch((err) => {
            console.log(err)
            toast.error('Something Went wrong !!!')
        })
    }

    const generatenow = () => {
        if (values) {
            const doc = new jsPDF()
            doc.text(`${_id}`, 10, 10)
            doc.text(`DeliveryTime - ${values.DeliveryTime}`, 10, 20)
            doc.text(`status - ${values.Status}`, 10, 30)
            doc.text(`UserId - ${values.UserID}`, 10, 40)
            doc.text(`Grand Total - ${values.GrandTotal}`, 10, 50)
            doc.text(`Quantity - ${values.Qty}`, 10, 60)
            doc.text(`Order Type - ${values.Type}`, 10, 70)
            doc.text(`Prices - ${values.Price}`, 10, 80)
            doc.text(`Items - ${values.Items}`, 10, 90)
            doc.text(`Address - ${values.Address}`, 10, 100)
            doc.save('a40.pdf')
        }
    }
    // <option value={'In Route'}>On The Way</option>
    return (
        <div>
            <ToastContainer />

            <div className='content1'>
                {
                    values &&
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", margin: "1em 0" }}>
                            <Form.Control type="text" value={values.Status} style={{ width: "400px" }} />
                            <select className="admin-order-utility-button" onChange={(e) => { setStatus(e.target.value) }}>
                                <option>Please Select</option>
                                <option value={'Processing'}>Processing</option>
                                <option value={'Order Delivered'}>Order Delivered</option>
                                <option value={'Cancelled'}>Cancelled</option>
                            </select>
                            <button className="admin-order-utility-button" onClick={handleSubmit}>Change Status</button>
                        </div>

                        <button onClick={generatenow}>Generate Pdf</button>
                        <table style={{ width: "100%" }} className="edit-order-table">
                            <tr>
                                <th><i class="fa fa-tag" /> &nbsp; Order Id</th>
                                <th><i class="fa fa-spinner" /> &nbsp; Status</th>
                                <th><i class="fa fa-clock-o" /> &nbsp; Delivery Time</th>
                            </tr>
                            <tr>
                                <td>{_id}</td>
                                <td>{values.Status}</td>
                                <td>{JSON.stringify(values && values.DeliveryTime)}</td>
                            </tr>
                            <tr>
                                <th><i class="fa fa-map-marker" /> &nbsp; Deliver to</th>
                                <th><i class="fa fa-taxi" /> &nbsp; Type</th>
                                <th><i class="fa fa-file-o" /> &nbsp; Grand Total</th>
                            </tr>
                            <tr>
                                <td>{values.Address}
                                <button className="admin-order-utility-button" onClick={() => setModalShow(!modalShow)}>Show</button>
                                </td>
                                <td>{values.Type}</td>
                                <td>{values.GrandTotal}</td>
                            </tr>
                        </table>
                        {modalShow ? <div>
                            <MapPicker defaultLocation={location}
                                zoom={15}
                                style={{ height: '300px', width: '300px' }}
                                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                        </div> : null}
                        <div style={{ fontWeight: "bolder", margin: "1em 0" }}>UserID -<Link to={`/admin/orders/from/user/${values.UserID}`}>{values.UserID}</Link></div>
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
