import React from 'react';
import './card.css'
import { Link } from 'react-router-dom'

const Card = ({ product }) => {

    return (
        <div className="catcard">
            <Link to={`/edit/category/${product._id}`}>
                <img src={product.data.imageURL} alt={product.data.catName} />
            </Link>
            <h5>{product.data.catName}</h5>
        </div>
    );
};

export default Card;