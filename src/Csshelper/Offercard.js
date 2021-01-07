import React from 'react';
import { Link } from 'react-router-dom'

const Offercard = ({ product }) => {

    return (
        <div>
            <div className="ofeecard">
                <Link to={`/admin/edit/offer/${product._id}`}>
                    <img src={product.data.ImageURL} alt={product.data.Title} />
                </Link>
                <div className='ofeecard1'>
                    <h6>Title:- {product.data.Title}</h6>
                    <h5>Subtitle:- {product.data.Subtitle.substring(0,25)}</h5>
                    <p>Discound %:- {product.data.discountPercentage}%</p>
                </div>
            </div>
        </div>
    );
};

export default Offercard;