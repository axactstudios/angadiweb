import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import '../Styles/shop.css'
import Radiobox from '../PagesHelper/Radiobox'
import { prices } from '../PagesHelper/FixedPrices'

const Shop = () => {

    const [dish, setDish] = useState([])
    const [resu, setResh] = useState([])
    const [cat, setCat] = useState([])
    const [showw, setShoww] = useState(false)

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

    const getsearch = () => {
        setResh([])
        catRef.where("nameSearch", "array-contains", `${values.name}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh([{ data: doc.data(), _id: doc.id }])
                })
            })
    }

    const handleChange = name => (e) => {
        const l = e.target.value
        setValues({ ...values, [name]: e.target.value })

        setResh([])
        catRef.where("category", "==", `${l}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    setShoww(true)
                })
            })
    }

    const handechange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
        setShoww(true)
    }

    const handleFilters = (filters, filterBy) => {

        let priceValues = handlePrice(filters);
        setResh([])

        catRef.where("price", "<", `${priceValues[1]}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    setShoww(true)
                })
            })

    }

    const handlePrice = value => {
        const data = prices
        let array = []
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array;
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
                                    <Form.Control type="text" placeholder="Enter Dish Name" onChange={handechange('name')} value={values.name} />
                                </Form.Group>
                            </Col>
                            <Col lg={2}>
                                <button onClick={getsearch}>Search</button>
                            </Col>

                        </Row>
                    </div>
                    <Row>
                        <Col lg={3}>
                            <div>
                                <p>Sort By Category</p>
                                <Form.Group >
                                    <select onChange={handleChange('category')} >
                                        <option>Please Select</option>
                                        {cat.map((c, i) =>
                                            (<option key={i} value={c.data.catName}>
                                                {c.data.catName}
                                            </option>)
                                        )}
                                    </select>
                                </Form.Group>
                            </div>
                            <div>
                                <p>Sort By Price</p>
                                <Radiobox prices={prices}
                                    handleFilters={filters => handleFilters(filters, 'price')}
                                />
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div>
                                {showw == false ?
                                    <div>
                                        <h4>We found {dish.length} Dishes</h4>
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
                                                        <Col lg={6} xl={4} key={k} sm={6} xs={12} className="homey1">
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