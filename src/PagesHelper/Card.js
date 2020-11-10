import React, { useState } from 'react';
import '../Styles/pgcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect, Link } from 'react-router-dom'

const Card = ({ product }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(0);


    const handleChange = () => e => {
        setCount(e.target.value < 1 ? 1 : e.target.value)
    }

    const addToCart = async (e) => {
        await addItem(product, () => {
            setRedirect(true);
        })

        if (count > 0) {
            updateItem(product._id, count)
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
                <input type='number' onChange={handleChange()} value={count} className='form-control' />
                <button onClick={addToCart}>Add</button>
            </div>
        </div>
    );
};

export default Card;

// <li>rating: {product.data.rating}</li>