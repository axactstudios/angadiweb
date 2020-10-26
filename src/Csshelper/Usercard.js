import React from 'react';
import {Link} from 'react-router-dom'


const Usercard = ({ product }) => {

    return (
        <div>
            <img src={product.data.pUrl} alt={product.data.Name} />
            <h3>{product.data.Name}</h3>
            <p>{product.data.mail}</p>
            <Link to={`/orders/from/user/${product.data.id}`}>View</Link>
        </div>
    );
};

export default Usercard;