import React, { useState, useEffect } from 'react';
import firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'


const AddArea = () => {

    const [ress, setress] = useState([])
    const [values, setValues] = useState({
        name: '',
        minOrderPrice: '',
        deliveryCharge: '',
        Emirate: '',
        zone: ''
    })

    const { name, minOrderPrice, deliveryCharge, zone, Emirate } = values

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
        if (deliveryCharge && minOrderPrice && minOrderPrice && zone && Emirate) {
            db.collection('EmiratesArea').add({
                name: name,
                minOrderPrice: minOrderPrice,
                deliveryCharge: deliveryCharge,
                zone: zone,
                Emirate: Emirate
            }).then(() => {
                toast.success('Emirates Added !!!')
                setValues({ ...values, name: '', minOrderPrice: ' ', deliveryCharge: '', zone: '', Emirate: '' })
            }).catch((err) => {
                toast.error('Something went wrong !!!')
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
                    <Form.Label>Zone</Form.Label><br />
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
                <Button onClick={handleSubmit}>Add Area</Button>
            </div>
        </div>
    );
};

export default AddArea;