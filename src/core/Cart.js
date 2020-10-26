import React, { useEffect, useState } from 'react';
import { getCart } from '../helpers/CartHelper'
import Card from '../PagesHelper/Card'

const Cart = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [])

    return (
        <div>
            {
                items && items.map((d, k) => (
                    <div key={k}>
                        <Card product={d} />
                    </div>
                ))
            }
        </div>
    );
};

export default Cart;