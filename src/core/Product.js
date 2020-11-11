import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Row, Col, Container } from 'react-bootstrap'
import '../Styles/productcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect, Link } from 'react-router-dom'
import ShowImage from '../PagesHelper/Showimage'

const Product = ({ match }) => {

    const db = firebase.firestore()
    const _id = match.params.dishId
    const [pro, setPro] = useState()
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(1);
    const [quan, setquan] = useState(500)
    const [cat, setCat] = useState([])

    useEffect(async () => {
        await db.collection('Dishes').doc(_id).get()
            .then(res => {
                setPro(res.data())
                setCat(cat => [...cat, { data: res.data(), _id: _id }])
            })
    }, [])

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
                                <Col xl={6}>
                                    <ShowImage item={pro} url="product" />
                                </Col>
                                <Col xl={6}>
                                    <h5>{pro.name}</h5>
                                    <h6>{pro.category}</h6>
                                    <p>Rs {pro.price}  <span>Rs {pro.iPrice}</span> </p>
                                    <h5>{pro.description}</h5>
                                    rating: {pro.rating}
                                    <div className='selectcard2'>
                                        <select onChange={handleChanged()} className="slectcard">
                                            <option value='500'>500 ML</option>
                                            <option value='1000'>1000 ML</option>
                                            <option value='1500'>1500 ML</option>
                                            <option value='2000'>2000 ML</option>
                                        </select>
                                    </div>
                                    <div className="inputdiv">
                                        <input type='number' onChange={handleChange()} value={count} className='cartinputt' />
                                    </div>
                                    <div className="cardbuttondiv">
                                        <button className='cardbutton' onClick={addToCart}>Add</button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    :
                    null
            }
        </div>
    );
};

export default Product;