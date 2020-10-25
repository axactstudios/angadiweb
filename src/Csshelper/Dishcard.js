import React from 'react';
import './card.css'
import { Link } from 'react-router-dom'

const Dishcard = ({ product }) => {

    return (
        <div>
            <div className="catcard">
                <Link to={`/edit/dish/${product._id}`}>
                    <img src={product.data.url} alt={product.data.name} />
                </Link>
                <h5>{product.data.name}</h5>
                <ul>
                    <li>description : {product.data.description}</li>
                    <li>iPrice: {product.data.iPrice}</li>
                    <li>price: {product.data.price}</li>
                    <li>rating: {product.data.rating}</li>
                    <li>special: {product.data.special}</li>
                    <li>top: {product.data.top}</li>
                </ul>
            </div>
        </div>
    );
};

export default Dishcard;