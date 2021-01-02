import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify';

const Getemirates = () => {

    const [emirates, setemirates] = useState([])
    const [area, setarea] = useState([])
    const [modalShow1, setModalshow1] = useState(false)
    const [modalShow2, setModalshow2] = useState(false)
    const [nameid, setnameid] = useState({})
    const [nameid1, setnameid1] = useState({})

    const db = firebase.firestore()

    useEffect(() => {
        setemirates([])
        db.collection('Emirates').get()
            .then((data) => {
                data.forEach((res) => {
                    setemirates(val => [...val, { data: res.data(), _id: res.id }])
                })
            })

        setarea([])
        db.collection('EmiratesArea').get()
            .then((data) => {
                data.forEach((res) => {
                    setarea(val => [...val, { data: res.data(), _id: res.id }])
                })
            })
    }, [])

    const deleteEmirates = (si) => () => {
        db.collection("Emirates").doc(si)
            .delete().then(function () {
                window.location.reload(false);
                toast.success('Emirate Deleted Succesfully')
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    const deleteEmiratesArea = (si) => () => {
        db.collection("EmiratesArea").doc(si)
            .delete().then(function () {
                window.location.reload(false);
                toast.success('Area Deleted Succesfully')
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }

    const MyVerticallyCenteredModal1 = (props) => {

        const [values, setValues] = useState({
            name: props.idd && props.idd.data && props.idd.data.name,
            minOrderPrice: props.idd && props.idd.data && props.idd.data.minOrderPrice,
            deliveryCharge: props.idd && props.idd.data && props.idd.data.deliveryCharge
        })

        const { name, minOrderPrice, deliveryCharge } = values

        const idw = props.idd && props.idd._id

        const handlechange = name => e => {
            setValues({ ...values, [name]: e.target.value })
        }

        const handleSubmit = () => {
            if (deliveryCharge && minOrderPrice && minOrderPrice) {
                db.collection('Emirates').doc(idw).update({
                    name: name,
                    minOrderPrice: minOrderPrice,
                    deliveryCharge: deliveryCharge
                }).then(() => {
                    toast.success('Emirates Updated !!!')
                    setValues({ ...values, name: '', minOrderPrice: ' ', deliveryCharge: '' })
                    window.location.reload(false);
                }).catch((err) => {
                    toast.error('Something went wrong !!!')
                })
            } else {
                toast.error('Please Fill all fields')
            }
        }


        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Emirate {props.idd && props.idd.data && props.idd.data.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ToastContainer />
                    <Form.Group>
                        <Form.Label>Emirates Name</Form.Label><br />
                        <Form.Control type='text' placeholder="Enter Emirate Name" value={name} onChange={handlechange('name')} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Minimum Order Price</Form.Label><br />
                        <Form.Control type='text' placeholder="Enter Minimum Order Price" value={minOrderPrice} onChange={handlechange('minOrderPrice')} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Delivery Charge</Form.Label><br />
                        <Form.Control type='text' placeholder="Enter Delivery Charges" value={deliveryCharge} onChange={handlechange('deliveryCharge')} />
                    </Form.Group>
                    <Button onClick={handleSubmit}>Edit {name}</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const MyVerticallyCenteredModal2 = (props) => {
        const [ress, setress] = useState([])
        const [values, setValues] = useState({
            name: props.idd && props.idd.data && props.idd.data.name,
            minOrderPrice: props.idd && props.idd.data && props.idd.data.minOrderPrice,
            deliveryCharge: props.idd && props.idd.data && props.idd.data.deliveryCharge,
            Emirate: props.idd && props.idd.data && props.idd.data.Emirate,
            zone: props.idd && props.idd.data && props.idd.data.zone
        })

        const { name, minOrderPrice, deliveryCharge, zone, Emirate } = values

        const db = firebase.firestore()
        const idw = props.idd && props.idd._id


        const handlechange = name => e => {
            setValues({ ...values, [name]: e.target.value })
        }

        useEffect(() => {
            setress([])
            db.collection('Emirates').get()
                .then((data) => {
                    data.forEach((res) => {
                        setress(val => [...val, { data: res.data(), _id: res.id }])
                    })
                })
        }, [])

        const handleSubmit = () => {
            if (deliveryCharge && minOrderPrice && minOrderPrice && zone && Emirate) {
                db.collection('EmiratesArea').doc(idw).update({
                    name: name,
                    minOrderPrice: minOrderPrice,
                    deliveryCharge: deliveryCharge,
                    zone: zone,
                    Emirate: Emirate
                }).then(() => {
                    toast.success('Emirates Area added !!!')
                    setValues({ ...values, name: '', minOrderPrice: ' ', deliveryCharge: '', zone: '', Emirate: '' })
                    window.location.reload(false);
                }).catch((err) => {
                    toast.error('Something went wrong !!!')
                })
            } else {
                toast.error('Please Fill all fields')
            }
        }

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit {props.idd && props.idd.data && props.idd.data.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group >
                        <Form.Label>Selected Emirate {Emirate}</Form.Label><br />
                        <select onChange={handlechange('Emirate')} >
                            <option>Please Select</option>
                            {
                                ress && ress.map((m, l) =>
                                    <option value={`${m.data.name}`}>{m.data.name}</option>
                                )
                            }
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Area Name</Form.Label><br />
                        <Form.Control type='text' placeholder="Enter Area Name" value={name} onChange={handlechange('name')} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Minimum Order Price</Form.Label><br />
                        <Form.Control type='text' placeholder="Enter Minimum Order Price" value={minOrderPrice} onChange={handlechange('minOrderPrice')} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Delivery Charge</Form.Label><br />
                        <Form.Control type='text' placeholder="Enter Delivery Charges" value={deliveryCharge} onChange={handlechange('deliveryCharge')} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Selected Zone {zone}</Form.Label><br />
                        <select onChange={handlechange('zone')} >
                            <option>Please Select</option>
                            <option value='Zone1'>Zone1</option>
                            <option value='Zone2'>Zone2</option>
                        </select>
                    </Form.Group>
                    <Button onClick={handleSubmit}>Edit {name}</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const shownow = (k) => (e) => {
        e.preventDefault()
        setnameid(k)
        setModalshow1(true)
    }

    const shownow1 = (k) => (e) => {
        e.preventDefault()
        setnameid1(k)
        setModalshow2(true)
    }


    return (
        <div>
            <ToastContainer />
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
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>All Area</h2>

                <Container fluid>
                    <Row>
                        {
                            emirates && emirates.map((m, l) =>
                                <Col key={l}>
                                    {m.data.name}
                                    <button onClick={deleteEmirates(m._id)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                    <button onClick={shownow(m)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                    <Container fluid>
                                        <Row>
                                            <Col>
                                                Zone1
                                        <div>
                                                    {
                                                        area && area.map((n, k) =>
                                                            <div>
                                                                {n.data.Emirate == m.data.name && n.data.zone === 'Zone1'
                                                                    ?
                                                                    <div>
                                                                        <h6>{n.data.name}</h6>
                                                                        <button onClick={deleteEmiratesArea(n._id)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                                        <button onClick={shownow1(n)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </Col>
                                            <Col>
                                                Zone2
                                           <div>
                                                    {
                                                        area && area.map((n, k) =>
                                                            <div>
                                                                {n.data.Emirate == m.data.name && n.data.zone === 'Zone2'
                                                                    ?
                                                                    <div>
                                                                        <h6>{n.data.name}</h6>
                                                                        <button onClick={deleteEmiratesArea(n._id)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                                        <button onClick={shownow1(n)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            )
                        }
                    </Row>
                </Container>


                <MyVerticallyCenteredModal2
                    show={modalShow2}
                    onHide={() => setModalshow2(false)}
                    idd={nameid1}
                />
                <MyVerticallyCenteredModal1
                    show={modalShow1}
                    onHide={() => setModalshow1(false)}
                    idd={nameid}
                />
            </div>
        </div>
    );
};

export default Getemirates;