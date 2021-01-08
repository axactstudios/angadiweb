import React, { useEffect, useState } from 'react';
import { getwhishlist, itemTotals } from '../helpers/wishlisthelper'
import { Link } from 'react-router-dom'

const Wishlist = () => {

    const [d, setd] = useState(5)
    const [items, setItems] = useState([]);
    var min = 1;
    var max = 100;
    var rand = min + (Math.random() * (max - min));

    const setdm = () => {
        setd(rand)
    }
    useEffect(() => {
        setItems(getwhishlist());
    }, [d])

    const noItemsMessage = () => {
        return (
            <h6 className="mmain1"><Link className="mmain" to='/'>Continue Shopping</Link></h6>
        )
    }

    return (
        <div>
            {
                JSON.stringify(items)
            }
        </div>
    );
};

export default Wishlist;