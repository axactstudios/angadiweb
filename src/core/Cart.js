import React, { useEffect, useState } from 'react';
import { getCart, itemTotal } from '../helpers/CartHelper'
import Card from '../PagesHelper/Card'

const Cart = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, [])

    const getTotal = () => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.data.price
        }, 0)
    }


    return (
        <div>
            <h3>{getTotal()}</h3>
            <h2>{itemTotal()} items In Cart</h2>
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