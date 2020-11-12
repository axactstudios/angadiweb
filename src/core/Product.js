import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Row, Col, Container } from 'react-bootstrap'
import '../Styles/productcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect } from 'react-router-dom'
import ShowImage from '../PagesHelper/Showimage'
import Card from '../PagesHelper/Card'

const Product = ({ match }) => {

    const db = firebase.firestore()
    const _id = match.params.dishId
    const [pro, setPro] = useState()
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(1);
    const [quan, setquan] = useState(500)
    const [cat, setCat] = useState([])
    const [resh, setResh] = useState([])

    useEffect(async () => {
        await db.collection('Dishes').doc(_id).get()
            .then(res => {
                setPro(res.data())
                setCat(cat => [...cat, { data: res.data(), _id: _id }])
                setResh([])
                db.collection("Dishes").where("category", "==", `${res.data().category}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                        })
                    })
            })
    }, [_id])

    const handleChange = () => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value)
    }

    const addToCart = async (e) => {
        await addItem(cat[0], () => {
            setRedirect(true);
        })

        if (count > 0) {
            updateItem(_id, count)
        }
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const handleChanged = () => (e) => {
        setquan(e.target.value)
    };

    return (
        <div className="proccard">
            {shouldRedirect(redirect)}
            {
                pro && pro.name && pro.url
                    ?
                    <div className="proccard1">
                        <Container>
                            <Row>
                                <Col md={6} xl={6}>
                                    <ShowImage item={pro} url="product" />
                                </Col>
                                <Col md={6} xl={6}>
                                    <div className="proccard2">
                                        <h5>{pro.name}</h5>
                                        <h6>{pro.category}</h6>
                                        <p>Rs {pro.price}  <span>Rs {pro.iPrice}</span> </p>
                                        <p className="proccard3">{pro.description.substring(0, 250)}</p>
                                        <h4>Rating :- {pro.rating}</h4>
                                        <div className="proccard4">
                                            <span>Adjust Quantity</span>
                                            <select onChange={handleChanged()} className="proccard5">
                                                <option value='500'>500 ML</option>
                                                <option value='1000'>1000 ML</option>
                                                <option value='1500'>1500 ML</option>
                                                <option value='2000'>2000 ML</option>
                                            </select>
                                        </div>
                                        <div className="proccard6">
                                            <span>No of Items</span>
                                            <input type='number' onChange={handleChange()} value={count} />
                                        </div>
                                        <div className="proccard7">
                                            <button onClick={addToCart}>Add To Cart</button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    :
                    null
            }
            <div className="proccard8">
                <div class="mu-title">
                    <span class="mu-subtitle">Related</span>
                    <h2>Products</h2>
                </div>
                <div className="homey">
                    <Container fluid>
                        <Row>
                            {
                                resh && resh.map((d, k) => (
                                    <Col lg={4} xl={3} key={k} sm={6} xs={12} className="homey1">
                                        <Card product={d} />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Product;