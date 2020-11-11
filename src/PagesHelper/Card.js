import React, { useState } from 'react';
import '../Styles/pgcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect, Link } from 'react-router-dom'

const Card = ({ product }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(0);
    const [quan, setquan] = useState(500)


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

    const handleChanged = () => (e) => {
        setquan(e.target.value)
    };

    return (
        <div className="csk">
            {shouldRedirect(redirect)}
            <div className="csk1">
                <Link to={`/dish/${product._id}`}>
                    <img src={product.data.url} alt={product.data.name} />
                </Link>
            </div>
            <div className="csk2">
                <h6>{product.data.name}</h6>
                <p>{product.data.category}</p>
                <div className='selectcard2'>
                    <select onChange={handleChanged()} className="slectcard">
                        <option value='500'>500 ML</option>
                        <option value='1000'>1000 ML</option>
                        <option value='1500'>1500 ML</option>
                        <option value='2000'>2000 ML</option>
                    </select>
                </div>
                <p>Rs {product.data.price}  <span>Rs {product.data.iPrice}</span> </p>
                <div className="inputdiv">
                    <input type='number' onChange={handleChange()} value={count} className='cartinputt' />
                </div>
                <div className="cardbuttondiv">
                    <button className='cardbutton' onClick={addToCart}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default Card;

// <li>rating: {product.data.rating}</li>