import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import Log from '../User/Logout'
import { itemTotal } from '../helpers/CartHelper'

const Menu = () => {

    useEffect(() => {
        itemTotal()
    }, [itemTotal()])

    return (
        <div>
            <div className="men1">
                <Link className="men" to='/'>Home</Link>
                <Link className="men" to='/get/orders'>orders</Link>
                <Link className="men" to='/get/dishes'>dishes</Link>
                <Link className="men" to='/get/category'>category</Link>
                <Link className="men" to='/get/offers'>Offers</Link>
                <Link className="men" to='/get/users'>Users</Link>
                <Link className="men" to='/add/category'>add category</Link>
                <Link className="men" to='/add/dish'>add dish</Link>
                <Link className="men" to='/add/offer'>add offer</Link>
                <Link className="men" to='/register'>register</Link>
                <Link className="men" to='/login'>login</Link>
                <Link className="men" to='/cart'>Cart <sup>{itemTotal()}</sup></Link>
                <Log />
            </div>
        </div>
    );
};

export default Menu;