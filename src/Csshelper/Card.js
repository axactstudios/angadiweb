import React from 'react';
import './card.css'

const Card = ({product}) => {
    return (
        <div className="catcard">
            <img src={product.imageURL} alt={product.catName} />  
            <h5>{product.catName}</h5>          
        </div>
    );
};

export default Card;