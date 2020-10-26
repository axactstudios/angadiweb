import React, { useState } from 'react';
import '../Styles/pgcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect, Link } from 'react-router-dom'

const Card = ({ product }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(1);

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    }

    const handleChange = productId => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value)
        if (e.target.value >= 1) {
            updateItem(productId, e.target.value)
        }
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    return (
        <div className="csk">
            {shouldRedirect(redirect)}
            <div className="csk1">
                <Link to={`/dish/${product._id}`}>
                    <img src={product.data.url} alt={product.data.name} />
                </Link>
            </div>
            <div className="csk2">
                <p>{product.data.name}</p>
                <li>iPrice: {product.data.iPrice}</li>
                <li>price: {product.data.price}</li>
                <li>rating: {product.data.rating}</li>
                <div className='input-group-prepend'>
                    <input type='number' onChange={handleChange(product._id)} value={count} className='form-control' />
                    <p className='input-group-text'>Adjust Quantity</p>
                </div>
                <button onClick={addToCart}>Add</button>
            </div>
        </div>
    );
};

export default Card;