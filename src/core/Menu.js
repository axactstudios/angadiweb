import React from 'react';
import {Link} from 'react-router-dom'

const Menu = () => {
    return (
        <div>
            <div className="men1">
            <Link className="men" to='/'>Home</Link>
            <Link className="men" to='/get/orders'>orders</Link>
            <Link className="men" to='/get/dishes'>dishes</Link>
            <Link className="men" to='/get/category'>category</Link>
            <Link className="men" to='/add/category'>add category</Link>
            <Link className="men" to='/add/dish'>add dish</Link>
            <Link className="men" to='/register'>register</Link>
            <Link className="men" to='/login'>login</Link>
            </div>
        </div>
    );
};

export default Menu;