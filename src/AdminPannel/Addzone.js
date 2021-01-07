import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'


const Addzone = () => {

    const [ress, setress] = useState([])
    const [values, setValues] = useState({
        name: '',
        minOrderPrice: '',
        deliveryCharge: '',
        Emirate: '',
    })

    const { name, minOrderPrice, deliveryCharge, Emirate } = values

    const db = firebase.firestore()

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
            db.collection('Zones').where('name', '==', `${name}`)
                .where('Emirate', '==', `${Emirate}`).get()
                .then((dd) => {
                    let i = 0
                    dd.forEach((ds) => {
                        i += 1
                    })
                    if (i == 0) {
                        db.collection('Zones').add({
                            name: name,
                            minOrderPrice: minOrderPrice,
                            deliveryCharge: deliveryCharge,
                            Emirate: Emirate
                        }).then(() => {
                            toast.success('Zone Added !!!')
                            setValues({ ...values, name: '', minOrderPrice: ' ', deliveryCharge: '', zone: '', Emirate: '' })
                        }).catch((err) => {
                            toast.error('Something went wrong !!!')
                        })
                    } else {
                        toast.error('Zone already added')
                    }
                })
        } else {
            toast.error('Please Fill all fields')
        }
    }


    return (
        <div>
            <div className='content1'>
                <ToastContainer />
                <Form.Group >
                    <Form.Label>Emirate</Form.Label><br />
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
                    <Form.Label>Zone Name</Form.Label><br />
                    <Form.Control type='text' placeholder="Enter Zone Name" value={name} onChange={handlechange('name')} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Minimum Order Price</Form.Label><br />
                    <Form.Control type='text' placeholder="Enter Minimum Order Price" value={minOrderPrice} onChange={handlechange('minOrderPrice')} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Delivery Charge</Form.Label><br />
                    <Form.Control type='text' placeholder="Enter Delivery Charges" value={deliveryCharge} onChange={handlechange('deliveryCharge')} />
                </Form.Group>
                <Button onClick={handleSubmit}>Add Zone</Button>
            </div>
        </div>
    );
};

export default Addzone;