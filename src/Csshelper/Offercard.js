import React from 'react';
import {Link} from 'react-router-dom'

const Offercard = ({ product }) => {

    console.log(product)

    return (
        <div>
            <div className="catcard">
                <Link to={`/edit/offer/${product._id}`}>
                    <img src={product.data.ImageURL} alt={product.data.Title} />
                </Link>
                <p>{product.data.Title}</p>
                <p>{product.data.Subtitle}</p>
                <p>{product.data.discountPercentage}</p>
            </div>
        </div>
    );
};

export default Offercard;