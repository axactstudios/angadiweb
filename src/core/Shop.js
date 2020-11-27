import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import '../Styles/shop.css'

const Shop = () => {

    const [dish, setDish] = useState([])
    const [resu, setResh] = useState([])
    const [cat, setCat] = useState([])
    const [showw, setShoww] = useState(false)
    const [values, setValues] = useState({
        name: '',
        category: '',
        price: '',
        sCat: ''
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
        setResh([])
        setShoww(true)
        setValues({ ...values, [name]: e.target.value })

        if (name == 'category') {
            setResh([])
            const q = e.target.value
            if (values.sCat || values.price) {
                setResh([])
                if (values.sCat && !values.price) {
                    setResh([])
                    catRef.where("category", "==", `${q}`)
                        .where('sCat', '==', `${values.sCat}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                if (values.price && !values.sCat) {
                    setResh([])
                    catRef.where("category", "==", `${q}`)
                        .where('price', '<', `${values.price}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                else {
                    setResh([])
                    catRef.where("category", "==", `${q}`)
                        .where('price', '<', `${values.price}`)
                        .where('sCat', '==', `${values.sCat}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
            }
            else {
                setResh([])
                catRef.where("category", "==", `${q}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                        })
                    })
            }
        }
        if (name == 'sCat') {
            const w = e.target.value
            setResh([])
            if (values.price || values.category) {
                setResh([])
                if (values.category && !values.price) {
                    setResh([])
                    catRef.where("category", "==", `${values.category}`)
                        .where('sCat', '==', `${w}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                if (values.price && !values.category) {
                    setResh([])
                    catRef.where("price", "<", `${values.price}`)
                        .where('sCat', '==', `${w}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                else {
                    setResh([])
                    catRef.where("category", "==", `${values.category}`)
                        .where('sCat', '==', `${w}`)
                        .where("price", "<", `${values.price}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
            }
            else {
                setResh([])
                catRef.where("sCat", "==", `${w}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                        })
                    })
            }
        }
        if (name == 'price') {
            const r = e.target.value
            setResh([])
            if (values.category || values.sCat) {
                setResh([])
                if (values.category && !values.sCat) {
                    setResh([])
                    catRef.where("category", "==", `${values.category}`)
                        .where('price', '<', `${r}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                if (values.sCat && !values.category) {
                    setResh([])
                    catRef.where("sCat", "==", `${values.sCat}`)
                        .where('price', '<', `${r}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                else {
                    setResh([])
                    catRef.where("sCat", "==", `${values.sCat}`)
                        .where('price', '<', `${r}`)
                        .where('category', '==', `${values.category}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
            }
            else {
                setResh([])
                catRef.where("price", "<", `${r}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            setShoww(true)
                        })
                    })
            }
        }
    }

    const handechange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
        setShoww(true)
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
                            <Col lg={10} sm={10} xs={9}>
                                <Form.Group >
                                    <Form.Control type="text" placeholder="Enter Dish Name" onChange={handechange('name')} value={values.name} />
                                </Form.Group>
                            </Col>
                            <Col lg={2} sm={2} xs={3}>
                                <button onClick={getsearch}>Search</button>
                            </Col>

                        </Row>
                    </div>
                    <Row>
                        <Col lg={3}>
                            <div className="shopii1">
                                <div className="shopi1">
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
                                <div className="shopi2">
                                    <p>Sort By Price</p>
                                    <input type="radio" name="Price" value="400" onChange={handleChange('price')} />
                                    <label > Less than 400</label><br />
                                    <input type="radio" name="Price" value="500" onChange={handleChange('price')} />
                                    <label > Less than 500</label><br />
                                    <input type="radio" name="Price" value="600" onChange={handleChange('price')} />
                                    <label > Less than 600</label><br />
                                    <input type="radio" name="Price" value="800" onChange={handleChange('price')} />
                                    <label > Less than 800</label><br />
                                    <input type="radio" name="Price" value="900" onChange={handleChange('price')} />
                                    <label > Less than 900</label><br />
                                </div>
                                <div className="shopi3">
                                    <p>Sort by Sub Category</p>
                                    <input type="radio" name="Food" value="Food" onChange={handleChange('sCat')} />
                                    <label > Food</label><br />
                                    <input type="radio" name="Food" value="Grocery" onChange={handleChange('sCat')} />
                                    <label > Grocery</label><br />
                                </div>
                            </div>
                        </Col>
                        <Col lg={9}>
                            <div className="shopii2">
                                {showw == false ?
                                    <div>
                                        <h4 >We found {dish.length} Dishes</h4>
                                        <Container fluid>
                                            <Row>
                                                {
                                                    dish && dish.map((d, k) => (
                                                        <Col lg={6} xl={4} key={k} sm={6} xs={12} className="homey1 shopii3">
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
                                                        <Col lg={6} xl={4} key={k} sm={6} xs={12} className="homey1 shopii3">
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