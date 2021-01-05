import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../Styles/menu.css'
import { isAuth } from '../helpers/auth'
import * as firebase from 'firebase'
import { Container, Form, Col, Row } from 'react-bootstrap';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'rgb(255,176,0)' }
    }
    else {
        return { color: "#3A3A3A" };
    }
}                                        // Dishes  name  

const Menu = ({ history }) => {

    const [cat, setCat] = useState([])
    const [Dishes, setDishes] = useState([])
    const db = firebase.firestore()
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    useEffect(() => {
        setCat([])
        db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })
        setDishes([])
        db.collection('Dishes').get()
            .then(res => {
                res.forEach((doc) => {
                    setDishes(Dishes => [...Dishes, { data: doc.data(), _id: doc.id }])
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
    const handleChange = name => (e) => {
        console.log(e.target.value)
        switch (name) {
            case 'image':
                const phooto = e.target.files[0];
                setValues({ ...values, photo: URL.createObjectURL(e.target.files[0]), image: phooto })
                break;
            default:
                setValues({ ...values, [name]: e.target.value })
                break;
        }
    };
    // const { name, category } = values
    const onInputChange = (event, value) => {
        setValues({ ...values, name: value })

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
                            <select onChange={handleChange('category')}>
                                <option value=''>Select Category</option>
                                {cat.map((c, i) =>
                                (<option key={i} value={c.data.catName}>
                                    {c.data.catName}
                                </option>)
                                )}
                            </select>
                        </Form.Group>
                        <Form.Group className="men2122">
                            <Autocomplete
                                id="combo-box-demo"
                                options={Dishes}
                                getOptionLabel={(option) => option.data.name}
                                onInputChange={onInputChange} //** on every input change hitting my api**
                                style={{ width: 230, 'margin-top': '11px', height: '85px', scrollbarWidth: 'none', borderRadius:'6px' }}
                                renderInput={(params) =>
                                    <TextField {...params} type="text" placeholder="I'm Searching For" value={values.name} className='malay-searchbar' />}
                            />
                        </Form.Group>
                        <div className="men2123">
                            <Link style={isActive(history, `/shop/${values.category}`)} to={{ pathname: `/shop/${values.category}`, state: { search: `${values.name}` } }}><button><i class="fa fa-search" aria-hidden="true"></i> Search</button></Link>
                        </div>
                    </div>

                    <div className='header-extra'>
                        <div className='header-extra1'>
                            <div className='header-extra11'>
                                <div className='header-extra12'>
                                    <i class="fa fa-map-marker" aria-hidden="true"></i> Deliver to, Delhi
                                </div>
                            </div>
                            <div className='header-extra13'>
                                <div className='header-extra14'>
                                    Next Delivery: <i class="fa fa-motorcycle" aria-hidden="true"></i> 26/10 at <i class="fa fa-clock-o" aria-hidden="true"></i> 9:00 AM
                                </div>
                            </div>
                        </div>
                        <div className='header-extra2'>
                            {
                                !isAuth() &&
                                <p>
                                    {!isAuth() && <Link onClick={changeScreen} style={isActive(history, '/login')} to='/login' className='bhaagi2'><i class="fa fa-user-circle-o" aria-hidden="true"></i> Login In /</Link>}
                                    {!isAuth() && <Link onClick={changeScreen} style={isActive(history, '/register')} to='/register' className='bhaagi2'>Register</Link>}
                                </p>
                            }
                            {
                                isAuth() &&
                                <div class="header-extra221">
                                    <button className="header-extra222"><i class="fa fa-user-circle-o" aria-hidden="true"></i> {isAuth().Name} <span><i class="fa fa-caret-down" aria-hidden="true"></i></span></button>
                                    <div className="header-extra223">
                                        <Link onClick={changeScreen} style={isActive(history, `/user/dashboard`)} to={`/user/dashboard`}>Dashboard</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/user/dashboard/myorders')} to='/user/dashboard/myorders'>My Orders</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/user/dashboard/updateprofile')} to='/user/dashboard/updateprofile'>Update Profile</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/user/dashboard/resetpassword')} to='/user/dashboard/resetpassword'>Reset Password</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/wishlist')} to='/wishlist'>Wishlist</Link>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='header-extra3'>
                            <p><Link onClick={changeScreen} style={isActive(history, '/cart')} to='/cart' className='bhaagi2'><i class="fa fa-shopping-cart" aria-hidden="true"></i> Shoping Cart</Link></p>
                        </div>
                    </div>

                    <div className="men23">
                        <div className="men2321">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                            <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                        </div>
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

                        <h4 className='titeel1'>Menu</h4>

                        <Link onClick={changeScreen} style={isActive(history, '/')} to='/' className='bhaagi2'><li>Home</li></Link>
                        <Link onClick={changeScreen} style={isActive(history, '/shop')} to='/shop' className='bhaagi2'><li>Do It Yourself</li></Link>

                        {
                            cat &&
                            <Fragment>
                                {
                                    cat.map((l, k) => (
                                        <Fragment>
                                            {
                                                l.data.catName === 'Pickles/Podi' &&
                                                <Link onClick={changeScreen} style={isActive(history, `/shop/${l.data.catName}`)} to={`/shop/${l.data.catName}`} className='bhaagi2'><li>{l.data.catName}</li></Link>
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
                                            <Link onClick={changeScreen} style={isActive(history, `/shop/${l.data.catName}`)} to={`/shop/${l.data.catName}`} className='bhaagi2'>{l.data.catName}</Link>
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
                                                <Link onClick={changeScreen} style={isActive(history, `/shop/${l.data.catName}`)} to={`/shop/${l.data.catName}`} className='bhaagi2'><li>{l.data.catName}</li></Link>
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
                                                <Link onClick={changeScreen} style={isActive(history, `/shop/${l.data.catName}`)} to={`/shop/${l.data.catName}`} className='bhaagi2'><li>{l.data.catName}</li></Link>
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
                                                <Link onClick={changeScreen} style={isActive(history, `/shop/${l.data.catName}`)} to={`/shop/${l.data.catName}`} className='bhaagi2'><li>{l.data.catName}</li></Link>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </Fragment>
                        }

                        <Container fluid className='titeel'>
                            <Row>
                                <Col>
                                    <a href='#'><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                </Col>
                                <Col>
                                    <a href='#'><i class="fa fa-instagram" aria-hidden="true"></i></a>
                                </Col>
                                <Col>
                                    <a href='#'><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                </Col>
                                <Col>
                                    <a href='#'><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                                </Col>
                            </Row>
                        </Container>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Menu);