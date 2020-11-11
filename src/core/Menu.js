import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Log from '../User/Logout'
import '../Styles/menu.css'
import Logo from '../images/angadilogo.png'
import { isAuth } from '../helpers/auth'
import * as firebase from 'firebase'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'rgb(255,176,0)' }
    }
    else {
        return { color: "#3A3A3A" };
    }
}

const Menu = ({ history }) => {

    const [cat, setCat] = useState([])
    const db = firebase.firestore()

    useEffect(() => {
        setCat([])
        db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })

        const hamburger = document.querySelector('.hamburger');
        const navlinks = document.querySelector('.navlink')

        hamburger.addEventListener("click", () => {
            navlinks.classList.toggle("open");
        })
    }, [])

    const changeScreen = () => {
        const navlinks = document.querySelector('.navlink')
        navlinks.classList.toggle("open");
    }

    return (
        <div> 
            <div className="men24">
                <div className="men2">
                    <div className="men21">
                        <h6><i className="fa fa-map-marker"></i> 69 Halsey St, New York, 1002</h6>
                    </div>
                    <div className="men22">
                        <Link style={isActive(history, '/')} to='/'><img src={Logo} alt="angadi logo" /></Link>
                    </div>
                    <div className="men23">
                        <h6><i className="fa fa-clock-o"></i> Opening Hours: 8:00am to 10:00pm</h6>
                    </div>
                </div>
            </div>
            <div className="nav">
                <div className="hamburger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="men3">
                    <ul className="navlink">
                        <Link onClick={changeScreen} style={isActive(history, '/')} to='/'><li>Home</li></Link>
                        <Link onClick={changeScreen} style={isActive(history, '/shop')} to='/shop'><li>Shop</li></Link>
                        {
                            cat &&
                            <div class="dropdown">
                                <button className="dropbtn">Category <span><i class="fa fa-caret-down" aria-hidden="true"></i></span></button>
                                <div className="dropdown-content">
                                    {
                                        cat.map((l, k) => (
                                            <Link onClick={changeScreen} style={isActive(history, `/category/${l.data.catName}`)} to={`/category/${l.data.catName}`}>{l.data.catName}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                        }
                        {!isAuth() && <Link onClick={changeScreen} style={isActive(history, '/login')} to='/login'><li>Sign In</li></Link>}
                        {
                            isAuth() &&
                            <div class="dropdown">
                                <button className="dropbtn">{isAuth().Name} <span><i class="fa fa-caret-down" aria-hidden="true"></i></span></button>
                                <div className="dropdown-content">
                                    <Link onClick={changeScreen} style={isActive(history, `/user/dashboard`)} to={`/user/dashboard`}>Profile</Link>
                                    <Link onClick={changeScreen} style={isActive(history, '/my/ads')} to='/my/ads'>My Orders</Link>
                                    <Link onClick={changeScreen} to=""><Log /></Link>
                                </div>
                            </div>
                        }
                        <Link onClick={changeScreen} style={isActive(history, '/contact/us')} to='/contact/us'><li>Contact us</li></Link>
                        <Link onClick={changeScreen} style={isActive(history, '/cart')} to='/cart'><li>Cart</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Menu);