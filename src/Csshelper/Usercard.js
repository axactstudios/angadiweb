import React from 'react';
import { Link } from 'react-router-dom'


const Usercard = ({ product }) => {

    return (
        <div style={{ margin: '-15px auto' }}>
            <div className='userdash' style={{ backgroundColor: 'white', borderTop: '1px solid black' }}>
                <div className='userdash1'>
                    {
                        product.data.pUrl &&
                        <img src={product.data.pUrl} alt={product.data.Name} />
                    }
                </div>
                <div className='userdash2'>
                    <h3>{product.data.Name}</h3>
                    <p>{product.data.mail}</p>
                    <Link to={`/orders/from/user/${product.data.id}`}>View</Link>
                </div>
            </div>

        </div>
    );
};

export default Usercard;