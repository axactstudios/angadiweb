import React, { useState } from 'react';
import firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'


const Addemirates = () => {

    const [values, setValues] = useState({
        name: '',
        minOrderPrice: '',
        deliveryCharge: ''
    })

    const { name, minOrderPrice, deliveryCharge } = values

    const db = firebase.firestore()

    const handlechange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }

    const handleSubmit = () => {
        if (deliveryCharge && minOrderPrice && minOrderPrice) {
            db.collection('Emirates').add({
                name: name,
                minOrderPrice: minOrderPrice,
                deliveryCharge: deliveryCharge
            }).then(() => {
                toast.success('Emirates Added !!!')
                setValues({ ...values, name: '', minOrderPrice: ' ', deliveryCharge: '' })
            }).catch((err) => {
                toast.error('Something went wrong !!!')
            })
        } else {
            toast.error('Please Fill all fields')
        }
    }

    return (
        <div>

            <div  className='content1'>
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
                <Button onClick={handleSubmit}>Add Brands</Button>
            </div>
        </div>
    );
};

export default Addemirates;