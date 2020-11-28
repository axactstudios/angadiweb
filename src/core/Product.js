import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Row, Col, Container } from 'react-bootstrap'
import '../Styles/productcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect } from 'react-router-dom'
import ShowImage from '../PagesHelper/Showimage'
import Card from '../PagesHelper/Card'
import $ from 'jquery'

const Product = ({ match }) => {

    const db = firebase.firestore()
    const _id = match.params.dishId
    const [pro, setPro] = useState()
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(1);
    const [quan, setquan] = useState(500)
    const [resh, setResh] = useState([])
    const [priccce, setpriccce] = useState(0)
    const [fakeprice, setfakeprice] = useState(0)
    const [pirro, setpiroo] = useState({
        category: '',
        iPrice: '',
        price: '',
        name: '',
        rating: '',
        sCat: '',
        url: '',
        url2: '',
        url3: '',
        _id: '',
        description: '',
        quantity: ''
    })

    useEffect(() => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [_id])

    useEffect(async () => {
        await db.collection('Dishes').doc(_id).get()
            .then(res => {
                setPro(res.data())
                setResh([])
                setpriccce(res.data().price)
                setfakeprice(res.data().iPrice)
                setpiroo({
                    ...pirro, category: res.data().category, iPrice: res.data().iPrice, price: res.data().price, name: res.data().name,
                    rating: res.data().rating, sCat: res.data().sCat, url: res.data().url, url2: res.data().url2, url3: res.data().url3,
                    _id: _id, description: res.data().description, quantity: quan,
                })
                db.collection("Dishes").where("category", "==", `${res.data().category}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                        })
                    })
            })
    }, [_id])

    // const handleChange = () => e => {
    //     setCount(e.target.value < 1 ? 1 : e.target.value)
    // }
    const handleChangepostive = () => e => {
        const q = count + 1
        setCount(q < 1 ? 1 : q)
    }
    const handleChangeneagative = () => e => {
        const w = count - 1
        setCount(w < 1 ? 1 : w)
    }

    const addToCart = async (e) => {
        await addItem(pirro, () => {
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
        const k = e.target.value / quan
        setpriccce(k * priccce)
        setfakeprice(k * fakeprice)
        setpiroo({ ...pirro, price: k * priccce, quantity: e.target.value, iPrice: k * pro.iPrice })
    };

    return (
        <div className='hwami'>
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
                                        <p>Rs {priccce}  <span>Rs {fakeprice}</span> </p>
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
                                            <div className="proccard611">
                                                <button className='inc' onClick={handleChangepostive()}>+</button>
                                                <h1>{count}</h1>
                                                <button className='dec' onClick={handleChangeneagative()}>-</button>
                                            </div>
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
        </div>
    );
};

export default Product;