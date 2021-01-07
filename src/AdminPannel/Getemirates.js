import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal, Button, Form } from 'react-bootstrap'
import firebase from 'firebase'
import { toast, ToastContainer } from 'react-toastify';
import '../Styles/emirates.css'

const Getemirates = () => {

    const [emirates, setemirates] = useState([])
    const [area, setarea] = useState([])
    const [zonne, setZonnne] = useState([])
    const [modalShow1, setModalshow1] = useState(false)
    const [modalShow2, setModalshow2] = useState(false)
    const [modalShow3, setModalshow3] = useState(false)
    const [nameid, setnameid] = useState({})
    const [nameid1, setnameid1] = useState({})
    const [nameid2, setnameid2] = useState({})

    const db = firebase.firestore()

    useEffect(() => {
        setemirates([])
        db.collection('Emirates').get()
            .then((data) => {
                data.forEach((res) => {
                    setemirates(val => [...val, { data: res.data(), _id: res.id }])
                })
            })
        setZonnne([])
        db.collection('Zones').get()
            .then((data) => {
                data.forEach((res) => {
                    setZonnne(val => [...val, { data: res.data(), _id: res.id }])
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

    const deleZOne = (si) => () => {
        db.collection("Zones").doc(si)
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
                            <option value='Zone3'>Zone3</option>
                            <option value='Zone4'>Zone4</option>
                            <option value='Zone5'>Zone5</option>
                            <option value='Zone6'>Zone6</option>
                            <option value='Zone7'>Zone7</option>
                            <option value='Zone8'>Zone8</option>
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

    const MyVerticallyCenteredModal3 = (props) => {
        const [ress, setress] = useState([])
        const [values, setValues] = useState({
            name: props.idd && props.idd.data && props.idd.data.name,
            minOrderPrice: props.idd && props.idd.data && props.idd.data.minOrderPrice,
            deliveryCharge: props.idd && props.idd.data && props.idd.data.deliveryCharge,
            Emirate: props.idd && props.idd.data && props.idd.data.Emirate
        })

        const { name, minOrderPrice, deliveryCharge, Emirate } = values

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
            if (deliveryCharge && minOrderPrice && name && Emirate) {
                db.collection('Zones').doc(idw).update({
                    name: name,
                    minOrderPrice: minOrderPrice,
                    deliveryCharge: deliveryCharge,
                    Emirate: Emirate
                }).then(() => {
                    toast.success('Zone Edit !!!')
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

    const shownow2 = (k) => (e) => {
        e.preventDefault()
        setnameid2(k)
        setModalshow3(true)
    }


    return (
        <div>
            <ToastContainer />

            <div className='content1'>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>All Area</h2>

                <Container fluid>
                    <Row>
                        {
                            emirates && emirates.map((m, l) =>
                                <Col key={l} lg={6} sm={12} xl={4} style={{ marginBottom: '30px' }}>
                                    <div className='emirates1'>
                                        <h6>Emirates: {m.data.name}</h6>
                                        <button onClick={shownow(m)} className='edit-emirates'><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                        <button onClick={deleteEmirates(m._id)} className='delete-emirates'><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                    </div>
                                    <Container fluid>
                                        <Row>
                                            {
                                                zonne.map((g, h) =>
                                                    <Col lg={6} className='emirates2'>
                                                        {g && g.data &&
                                                            g.data.Emirate == m.data.name ?
                                                            <div>
                                                                <div className='emirates1'>
                                                                    <h6>{g.data.name}</h6>
                                                                    <button onClick={shownow2(g)} className='edit-emirates'><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                                    <button onClick={deleZOne(g._id)} className='delete-emirates'><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                                </div>
                                                                {
                                                                    area && area.map((n, k) =>
                                                                        <div>
                                                                            {
                                                                                n && n.data && n.data.Emirate == m.data.name && n.data.zone === g.data.name
                                                                                    ?
                                                                                    <div className='emirates3'>
                                                                                        <h6>{n.data.name}</h6>
                                                                                        <button onClick={shownow1(n)} className='edit-emirates'><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                                                        <button onClick={deleteEmiratesArea(n._id)} className='delete-emirates'><i class="fa fa-trash-o" aria-hidden="true"></i></button>
                                                                                    </div>
                                                                                    :
                                                                                    null
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </Col>
                                                )
                                            }

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
                <MyVerticallyCenteredModal3
                    show={modalShow3}
                    onHide={() => setModalshow3(false)}
                    idd={nameid2}
                />
            </div>
        </div>
    );
};

export default Getemirates;