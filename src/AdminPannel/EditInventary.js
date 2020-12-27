import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { Form } from 'react-bootstrap'
import { Col, Container, Row } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import Switch from '@material-ui/core/Switch'

const EditInventary = () => {

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
        switch (name) {
            case 'image':
                const phooto = e.target.files[0];
                setValues({ ...values, photo: URL.createObjectURL(e.target.files[0]), image: phooto })
                break;
            default:
                setValues({ ...values, [name]: e.target.value })
                break;
        }
    };

    const changestocktrue = (a) => (e) => {
        db.collection('Dishes').doc(a).update({
            stock: true
        }).then((res) => {
            toast.success('Dish Update successfully')
            window.location.reload();
        }).catch((err) => {
            toast.error('Something went wrong !!!')
        })
    }

    const changestockfalse = (a) => (e) => {
        db.collection('Dishes').doc(a).update({
            stock: false
        }).then((res) => {
            toast.success('Dish Update successfully')
            window.location.reload();
        }).catch((err) => {
            toast.error('Something went wrong !!!')
        })
    }

    return (
        <div>
            <ToastContainer />
            <div>
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
                        <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                        <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                        <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
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
                    <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                    <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                    <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
                </div>

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
                        <Form.Group className="adpor1">
                            <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={values.name} />
                        </Form.Group>
                        <div className="adpor3">
                            <button onClick={getspecific}>Search</button>
                        </div>
                    </div>
                    <div>
                        {
                            resu.length == 0 ?
                                <Container fluid>
                                    <h2 style={{ textAlign: 'center' }}>Total {dish.length} Products</h2>
                                    {
                                        dish && dish.map((d, k) => (
                                            <Container fluid className='edit-inventary'>
                                                <Row>
                                                    <Col>
                                                        {d.data.name}
                                                    </Col>
                                                    <Col>
                                                        <b>{d._id}</b>
                                                    </Col>
                                                    <Col>
                                                        Rs {d.data.price}
                                                    </Col>
                                                    <Col>
                                                        {d.data.stock ? <Switch color="primary" checked="true" onClick={changestockfalse(d._id)} /> : <Switch color="primary" onClick={changestocktrue(d._id)} />}
                                                    </Col>
                                                </Row>
                                            </Container>
                                        ))
                                    }
                                </Container>
                                :
                                <div>
                                    <h4>{resu.length} result found</h4>
                                    <Container fluid>
                                        {
                                            resu && resu.map((d, k) => (
                                                <Container fluid>
                                                    <Row>
                                                        <Col>
                                                            {d.data.name}
                                                        </Col>
                                                        <Col>
                                                            <b>{d._id}</b>
                                                        </Col>
                                                        <Col>
                                                            Rs {d.data.price}
                                                        </Col>
                                                        <Col>
                                                            {d.data.stock ? <button onClick={changestockfalse(d._id)}>Change to Out of stock</button> : <button onClick={changestocktrue(d._id)}>Change to In stock</button>}
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            ))
                                        }
                                    </Container>
                                </div>
                        }
                        <div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default EditInventary; 