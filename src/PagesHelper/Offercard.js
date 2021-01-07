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
                    <h6>{product.data.Title}</h6>
                </div>
            </div>
        </div>
    );
};

export default Offercard;