import React from 'react';
import './card.css'
import { Link } from 'react-router-dom'

const Card = ({ product }) => {

    return (
        <div className="catcard">
            <Link to={`/admin/edit/category/${product._id}`}>
                <img src={product.data.imageURL} alt={product.data.catName} />
            </Link>
            <h5>{product.data.catName}</h5>
            <p style={{textAlign:'center'}}>Scat:- {product.data.sCat}</p>
        </div>
    );
};

export default Card;