import React, { useEffect, useState } from 'react';
import { getCart, itemTotal } from '../helpers/CartHelper'
import Card from '../PagesHelper/Cartcard'
import { Link } from 'react-router-dom'
import Checkout from './Checkout';
import '../Styles/cart.css'

const Cart = () => {

    const [items, setItems] = useState([]);
    const [d, setd] = useState(5)

    var min = 1;
    var max = 100;
    var rand = min + (Math.random() * (max - min));

    const setdm = () => {
        setd(rand)
    }

    useEffect(() => {
        setItems(getCart());
    }, [])

    const noItemsMessage = () => {
        return (
            <h6 className="mmain1"><Link className="mmain" to='/'>Continue Shopping</Link></h6>
        )
    }


    return (
        <div className="maincart">
            <div class="mu-title">
                <span class="mu-subtitle">{itemTotal()} Items In cart</span>
            </div>
            <div className="maincart1">
                <div className="maincart2">
                    {
                        items.length > 0 ?
                            <div>
                                {
                                    items && items.map((d, k) => (
                                        <Card key={k} product={d} dm={d} setdm={setdm} />
                                    ))
                                }
                            </div>
                            : noItemsMessage()
                    }
                </div>
                <div className="maincart3">
                    <h2>Your cart summary</h2>
                    <Checkout products={items} dm={d} />
                </div>
            </div>
        </div>
    );
};

export default Cart;