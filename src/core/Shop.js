import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import '../Styles/shop.css'

const Shop = () => {

    const [dish, setDish] = useState([])
    const [resu, setResh] = useState([])
    const [cat, setCat] = useState([])

    const [values, setValues] = useState({
        name: '',
        category: ''
    })

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

    const db = firebase.firestore()
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
            catRef.where("nameSearch", "array-contains", `${values.name}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh([{ data: doc.data(), _id: doc.id }])
                    })
                })
        }
    }

    const handleChange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
    }

    return (
        <div>
            <div class="mu-title">
                <span class="mu-subtitle">Discover</span>
                <h2>Our Products</h2>
            </div>
            <div className="homey2">
                <Container fluid>
                    <div className="shopi">
                        <Row>
                            <Col lg={10}>
                                <Form.Group >
                                    <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={values.name} />
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <button onClick={getspecific}>Search</button>
                            </Col>

                        </Row>
                    </div>
                    <Row>
                        <Col lg={3}>
                            <div>
                                <p>Sort By Category</p>
                            </div>
                            <div>
                                <p>Sort By Price</p>
                            </div>
                            <div>
                                <p>Sort by SubCategory</p>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div>
                                {resu.length == 0 ?
                                    <div>
                                        <Container>
                                            <Row>
                                                {
                                                    dish && dish.map((d, k) => (
                                                        <Col lg={6} xl={4} key={k} sm={6} xs={12} className="homey1">
                                                            <Card product={d} />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Container>
                                    </div>
                                    :
                                    <div>
                                        <h4>{resu.length} result found</h4>
                                        <Container>
                                            <Row>
                                                {
                                                    resu && resu.map((d, k) => (
                                                        <Col lg={4} xl={3} key={k} sm={6} xs={12} className="homey1">
                                                            <Card product={d} />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Container>
                                    </div>
                                }
                                <div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Shop;