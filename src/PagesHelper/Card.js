import React from 'react';
import '../Styles/pgcard.css'

const Card = ({ product }) => {
    return (
        <div className="csk">
            <div className="csk1">
                <img src={product.data.url} alt={product.data.name} />
            </div>
            <div className="csk2">
                <p>{product.data.name}</p>
                <li>iPrice: {product.data.iPrice}</li>
                <li>price: {product.data.price}</li>
                <li>rating: {product.data.rating}</li>
            </div>
        </div>
    );
};

export default Card;