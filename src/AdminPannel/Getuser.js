import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import OrderTable from './OrderTable';
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import '../Styles/adminPanel.css';

const columns = [
    { id: 'pUrl', label: "User Profile", format: (value) => <img src={value} height="70px" width="70px" /> },
    { id: 'Name', label: 'Name', maxWidth: "20%" },
    { id: 'phone', label: 'Phone',maxWidth: "12%" },
    { id: 'id', label: 'User ID' },
    { id: 'mail', label: 'Email' },
    { id: 'role', label: 'Role' }
];

const Getuser = () => {

    const [values, setValues] = useState({
        name: '',
        category: '',
        emaiil: '',
        phone: ''
    })
    const [dish, setDish] = useState([])
    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Users').get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    };

    const getspecific = () => {
        if (values.name == '' && values.emaiil == '') {
            toast.error('Enter Name or Email')
        } else {
            if (values.name && values.emaiil == '') {
                setDish([])
                db.collection('Users').where("mail", "==", `${values.name}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setDish([{ data: doc.data(), _id: doc.id }])
                        })
                    })
            }
            else if (values.emaiil && values.name == '') {
                setDish([])
                db.collection('Users').where("Name", "==", `${values.emaiil}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setDish([{ data: doc.data(), _id: doc.id }])
                        })
                    })
            } else if (values.emaiil && values.name) {
                setDish([])
                db.collection('Users')
                    .where("Name", "==", `${values.emaiil}`)
                    .where("mail", "==", `${values.name}`)
                    .get()
                    .then(res => {
                        res.forEach((doc) => {
                            setDish([{ data: doc.data(), _id: doc.id }])
                        })
                    })
            } else {
                console.log('Nice !!!')
            }
        }
    }

    return (
        <div>
            <ToastContainer />

            <div className='content1'>
                <h2 style={{ margin: "0.4em 0", fontWeight: "bold" }}>All Users</h2>
                <div className="adpor">
                    <Form.Group className="adpor1">
                        <Form.Control type="text" placeholder="Enter User Email" onChange={handleChange('name')} value={values.name} />
                    </Form.Group>
                    <Form.Group className="adpor1">
                        <Form.Control type="text" placeholder="Enter User Name" onChange={handleChange('emaiil')} value={values.emaiil} />
                    </Form.Group>
                    <Form.Group className="adpor1">
                        <Form.Control type="number" placeholder="Enter User Phone" onChange={handleChange('phone')} value={values.phone} />
                    </Form.Group>
                    <div className="adpor3">
                        <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                    </div>
                </div>
                <OrderTable details={dish} columns={columns} />
            </div>
        </div>
    );
};

export default Getuser;