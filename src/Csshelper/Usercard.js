import React from 'react';
import { Link } from 'react-router-dom'


const Usercard = ({ product }) => {

    return (
        <div style={{ margin: '8px auto' }}>
            <div className='userdash fegg1' style={{ backgroundColor: 'white', borderTop: '1px solid black' }}>
                <div className='userdash1 fegg2'>
                    {
                        product.data.pUrl &&
                        <img src={product.data.pUrl} alt={product.data.Name} />
                    }
                    {
                        !product.data.pUrl &&
                        <img src={'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'} alt={product.data.Name} />
                    }
                </div>
                <div className='userdash2 fegg3'>
                    <h3>{product.data.Name}</h3>
                    <p>{product.data.mail}</p>
                    <Link to={`/orders/from/user/${product.data.id}`}>View</Link>
                </div>
            </div>

        </div>
    );
};

export default Usercard;