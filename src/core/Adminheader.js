import React from 'react';
import { Link } from 'react-router-dom'

const Adminheader = () => {
    return (
        <div>
            <div className="men1">
                <Link className="men" to='/'>Home</Link>
                <Link className="men" to='/get/orders'>orders</Link>
                <Link className="men" to='/get/dishes'>dishes</Link>
                <Link className="men" to='/get/category'>category</Link>
                <Link className="men" to='/get/offers'>Offers</Link>
                <Link className="men" to='/get/users'>Users</Link>
                <Link className="men" to='/create/category'>add category</Link>
                <Link className="men" to='/add/dish'>add dish</Link>
                <Link className="men" to='/add/offer'>add offer</Link>
                <Link className="men" to='/register'>register</Link>
                <Link className="men" to='/login'>login</Link>
                <Link className="men" to='/cart'>Cart </Link>
            </div>

        </div>
    );
};

export default Adminheader;