import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { Form } from 'react-bootstrap'
import OrderTable from './OrderTable';
import { toast, ToastContainer } from 'react-toastify'
import '../Csshelper/card.css'

const Getcategory = () => {
    const [dish, setDish] = useState([])
    const [resu, setResh] = useState([])
    const [cat, setCat] = useState([])
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Dishes').get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        setCat([])
        db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])


    var catRef = db.collection('Dishes');

    const getspecific = () => {
        if (values.name == '') {
            setResh([])
            catRef.where("category", "==", `${values.category}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        } else {
            catRef.where("name", "==", `${values.name}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh([{ data: doc.data(), _id: doc.id }])
                    })
                })
        }
    }

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    };


    const columns = [
        { id: 'name', label: "Item", maxWidth: "40%" },
        { id: 'category', label: 'Category', maxWidth: "20%" },
        { id: 'iPrice', label: 'Price', maxWidth: "10%" },
        { id: 'stock', label: 'Available', maxWidth: "10%", format: (value) => value ? <b style={{ color: 'green' }}>Available</b> : <b style={{ color: 'red' }}>Unavailabe</b> },
        { id: 'action', label: 'Actions', align: "center" }
    ];

    return (
        <div>
            <ToastContainer />

            <div className='content1'>
                <div className="adpor">
                    <Form.Group className="adpor2">
                        <select onChange={handleChange('category')} >
                            <option>Choose Category</option>1
                            {cat.map((c, i) =>
                            (<option key={i} value={c.data.catName}>
                                {c.data.catName}
                            </option>)
                            )}
                        </select>
                    </Form.Group>
                    <Form.Group className="adpor1" style={{ width: '400px' }}>
                        <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={values.name} />
                    </Form.Group>
                    <div className="adpor3">
                        <button className="admin-order-utility-button" onClick={getspecific}>Search</button>
                    </div>
                    <Link to='/admin/edit/inventary'><button className="admin-order-utility-button">Inventory</button></Link>
                </div>

                {
                    resu.length == 0 ?

                        <OrderTable details={dish} columns={columns} /> :

                        <OrderTable details={resu} columns={columns} />
                }

            </div>
        </div>
    );
};


export default Getcategory;