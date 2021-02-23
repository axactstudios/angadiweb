import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
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
                                    <Container fluid className='edit-inventary'>
                                        <Row>
                                            <Col>
                                                Product Name
                                    </Col>
                                            <Col>
                                                <b>Product Id</b>
                                            </Col>
                                            <Col>
                                                Price
                                    </Col>
                                            <Col>
                                                Active
                                    </Col>
                                        </Row>
                                    </Container>
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
                                                        AED {d.data.price}
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
                                                            AED {d.data.price}
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