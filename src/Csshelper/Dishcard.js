import React from 'react';
import './card.css'
import { Link } from 'react-router-dom'

const Dishcard = ({ product }) => {

    return (
        <div className="csk">
            <div className="csk1">
                <Link to={`/edit/dish/${product._id}`}>
                    <img src={product.data.url} alt={product.data.name} />
                </Link>
            </div>
            <div className="mikaal">
                <h5>{product.data.name}</h5>
                <ul>
                    <li>Actual Price: {product.data.iPrice}</li>
                    <li>Selling Price: {product.data.price}</li>
                    <li>Rating: {product.data.rating}</li>
                    <li>Is Special: {JSON.stringify(product.data.special)}</li>
                    <li>Is Top: {JSON.stringify(product.data.top)}</li>
                </ul>
            </div>
        </div >
    );
};


export default Dishcard;