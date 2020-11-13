import React, { useState } from 'react';
import '../Styles/cartcard.css'
import { Container, Row, Col } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { updateItem, removeItem } from '../helpers/CartHelper'

const Cartcard = ({ product,
    showViewProductButthon = true,
    cartUpdate = true,
    showRemoveProductButton = true,
    setdm
}) => {

    const [shop, setShop] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButthon) => {
        return (
            showViewProductButthon && (
                <button className="bttncart">
                    View </button>
            )
        )
    }

    const shouldGo = shop => {
        if (shop) {
            return <Redirect to='/' />
        }
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/' />
        }
    }

    // const handleChange = productId => e => {
    //     setCount(e.target.value < 1 ? 1 : e.target.value)
    //     if (e.target.value >= 1) {
    //         updateItem(productId, e.target.value)
    //         setdm()
    //     }
    // }

    const handleChangepostive = (productId) => () => {
        const w = count + 1
        setCount(w < 1 ? 1 : w)
        if (w >= 1) {
            updateItem(productId, w)
            setdm()
        }
    }
    const handleChangeneagative = (productId) => () => {
        const q = count - 1
        setCount(q < 1 ? 1 : q)
        if (q >= 1) {
            updateItem(productId, q)
            setdm()
        }
    }

    const showCartUpdateOption = cartUpdate => {
        return cartUpdate && <div className="carttAd">
            <div className="carttAd1">
                <span>No of Items</span>
                <div className="proccard611">
                    <button className='inc' onClick={handleChangepostive(product._id)}>+</button>
                    <h1>{count}</h1>
                    <button className='dec' onClick={handleChangeneagative(product._id)}>-</button>
                </div>
            </div>
        </div>
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button className="bttncart1" onClick={() => {
                    removeItem(product._id)
                    setShop(true)
                }}>
                    Remove
                </button>
            )
        )
    }

    return (
        <div>
            <div className="cartt">
                {shouldRedirect(redirect)}
                {shouldGo(shop)}
                <Container fluid>
                    <Row>
                        <Col sm={12} md={3}>
                            <div className="carttPic1">
                                <img src={product.url} alt={product.name} />
                            </div>
                        </Col>
                        <Col sm={12} md={9}>
                            <div className="cartt2">
                                <h2>{product.name} </h2>
                                <h3><i className="fa fa-inr"></i>{product.price} <span style={{ color: 'rgb(252, 32, 32)', textDecoration: 'line-through' }}><i className="fa fa-inr"></i>{product.iPrice}</span></h3>
                                <h6>{product.quantity} ML</h6>
                                {showCartUpdateOption(cartUpdate)}
                                <Link to={`/dish/${product._id}`}>
                                    {showViewButton(showViewProductButthon)}
                                </Link>
                                {showRemoveButton(showRemoveProductButton)}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Cartcard;

// <p className="cartt5">{product.data.rating}</p>

// <p>Adjust Quantity</p>
// <input type='number' onChange={handleChange(product._id)} value={count} className='form-control' />