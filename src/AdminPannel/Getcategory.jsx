import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import OrderTable from './OrderTable';
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';

const columns = [
    { id: 'imageURL', label: "Category", align: "center", format: (value) => <img src={value} height="70px" width="70px" /> },
    { id: 'catName', label: 'Name' },
    { id: 'sCat', label: 'Sub-Category' },
    { id: 'editcat', label: 'Edit Category', align: "center", maxWidth: "20%" }
];

const Getcategory = () => {
    const [values, setValues] = useState({
        name: ''
    })
    const [cat, setCat] = useState([])
    const db = firebase.firestore()

    useEffect(async () => {
        setCat([])
        await db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
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
        if (values.name == '') {
            toast.error('Enter Category Name')
        } else {
            setCat([])
            db.collection('Categories')
                .where("catName", "==", `${values.name}`)
                .get()
                .then(res => {
                    res.forEach((doc) => {
                        setCat([{ data: doc.data(), _id: doc.id }])
                    })
                })
        }
    }


    return (
        <div>
            <ToastContainer />

            <div className='content1'>
                <h2 style={{ textAlign: 'center', margin: "0.5em 0", fontWeight: "bold" }}>All Categories</h2>
                <div className="adpor">
                    <Form.Group className="adpor1">
                        <Form.Control type="text" placeholder="Enter Category Name" onChange={handleChange('name')} value={values.name} />
                    </Form.Group>
                    <div className="adpor3">
                        <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                    </div>
                </div>
                <OrderTable details={cat} columns={columns} />
            </div>
        </div>
    );
};

export default Getcategory;