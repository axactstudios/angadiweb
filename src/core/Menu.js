import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Log from '../User/Logout'
import '../Styles/menu.css'
import { isAuth } from '../helpers/auth'
import * as firebase from 'firebase'
import { Form } from 'react-bootstrap';

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
                    <div className="men22">
                        <Link style={isActive(history, '/')} to='/'><img src={'https://www.angadi.ae/wp-content/uploads/2020/06/Angadi-3.jpg'} alt="angadi logo" /></Link>
                    </div>
                    <div className="men21">
                        <Form.Group className="men2121">
                            <select>
                                <option>Select Category</option>1
                                {cat.map((c, i) =>
                                    (<option key={i} value={c.data.catName}>
                                        {c.data.catName}
                                    </option>)
                                )}
                            </select>
                        </Form.Group>
                        <Form.Group className="men2122">
                            <Form.Control type="text" placeholder="I'm Searching For" />
                        </Form.Group>
                        <div className="men2123">
                            <button><i class="fa fa-search" aria-hidden="true"></i> Search</button>
                        </div>
                    </div>
                    <div className="men23">
                        { /* <div className="men2321"><span><i class="fa fa-shopping-cart"></i></span> My Shopping Cart <i class="fa fa-chevron-down" aria-hidden="true"></i> <p></p></div> */}
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
                        <Link onClick={changeScreen} style={isActive(history, '/shop')} to='/shop'><li>Do It Yourself</li></Link>

                        {
                            cat &&
                            <Fragment>
                                {
                                    cat.map((l, k) => (
                                        <Fragment>
                                            {
                                                l.data.catName === 'Pickles/Podi' &&
                                                <Link onClick={changeScreen} style={isActive(history, `/category/${l.data.catName}`)} to={`/category/${l.data.catName}`}><li>{l.data.catName}</li></Link>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </Fragment>
                        }

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

                        {
                            cat &&
                            <Fragment>
                                {
                                    cat.map((l, k) => (
                                        <Fragment>
                                            {
                                                l.data.catName === 'Curries/Koottu' &&
                                                <Link onClick={changeScreen} style={isActive(history, `/category/${l.data.catName}`)} to={`/category/${l.data.catName}`}><li>{l.data.catName}</li></Link>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </Fragment>
                        }

                        {
                            cat &&
                            <Fragment>
                                {
                                    cat.map((l, k) => (
                                        <Fragment>
                                            {
                                                l.data.catName === 'Rice' &&
                                                <Link onClick={changeScreen} style={isActive(history, `/category/${l.data.catName}`)} to={`/category/${l.data.catName}`}><li>{l.data.catName}</li></Link>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </Fragment>
                        }

                        {
                            cat &&
                            <Fragment>
                                {
                                    cat.map((l, k) => (
                                        <Fragment>
                                            {
                                                l.data.catName === 'Tiffin' &&
                                                <Link onClick={changeScreen} style={isActive(history, `/category/${l.data.catName}`)} to={`/category/${l.data.catName}`}><li>{l.data.catName}</li></Link>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </Fragment>
                        }

                        <Link onClick={changeScreen} style={isActive(history, '/cart')} to='/cart'><li><i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart</li></Link>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Menu);