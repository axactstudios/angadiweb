import React, { useState, useEffect } from 'react';
import '../Styles/pgcard.css'
import { addItem, updateItem } from '../helpers/CartHelper'
import { Redirect, Link } from 'react-router-dom'

const Card = ({ product }) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(0);
    const [quan, setquan] = useState(500);
    const [priccce, setpriccce] = useState(0)
    const [fakeprice, setfakeprice] = useState(0)
    const [pirro, setpiroo] = useState({
        category: '',
        iPrice: '',
        price: '',
        name: '',
        rating: '',
        sCat: '',
        url: '',
        url2: '',
        url3: '',
        _id: '',
        description: '',
        quantity: ''
    })

    useEffect(() => {
        if (product) {
            setpiroo({
                ...pirro, category: product.data.category, iPrice: product.data.iPrice, price: product.data.price, name: product.data.name,
                rating: product.data.rating, sCat: product.data.sCat, url: product.data.url, url2: product.data.url2, url3: product.data.url3,
                _id: product._id, description: product.data.description, quantity: quan,
            })
            setpriccce(product.data.price)
            setfakeprice(product.data.iPrice)
        }
    }, [product._id])


    // const handleChange = () => e => {
    //     setCount(e.target.value < 1 ? 1 : e.target.value)
    // }
    const handleChangepostive = () => e => {
        setCount(count < 1 ? 1 : count + 1)
    }
    const handleChangeneagative = () => e => {
        setCount(count < 1 ? 1 : count - 1)
    }

    const addToCart = async (e) => {
        await addItem(pirro, () => {
            setRedirect(true);
        })

        if (count > 0) {
            updateItem(product._id, count)
        }
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const handleChanged = () => (e) => {
        setquan(e.target.value)
        const k = e.target.value / quan
        setpriccce(k * priccce)
        setfakeprice(k * fakeprice)
        setpiroo({ ...pirro, price: k * priccce, quantity: e.target.value, iPrice: k * fakeprice })
    };

    return (
        <div className="csk">
            {shouldRedirect(redirect)}
            <div className="csk1">
                <Link to={`/dish/${product._id}`}>
                    <img src={product.data.url} alt={product.data.name} />
                </Link>
            </div>
            <div className="csk2">
                <h6>{product.data.name}</h6>
                <p>{product.data.category}</p>
                <div className='selectcard2'>
                    <select onChange={handleChanged()} className="slectcard">
                        <option value='500'>500 ML</option>
                        <option value='1000'>1000 ML</option>
                        <option value='1500'>1500 ML</option>
                        <option value='2000'>2000 ML</option>
                    </select>
                </div>
                <p>Rs {priccce}  <span>Rs {fakeprice}</span> </p>
                <div className="inputdiv">
                    <div className="proccard611">
                        <button className='inc' onClick={handleChangepostive()}>+</button>
                        <h1>{count}</h1>
                        <button className='dec' onClick={handleChangeneagative()}>-</button>
                    </div>
                </div>
                <div className="cardbuttondiv">
                    <button className='cardbutton' onClick={addToCart}>Add</button>
                </div>
            </div>
        </div>
    );
};

export default Card;

// <li>rating: {product.data.rating}</li>