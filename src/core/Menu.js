import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../Styles/menu.css'
import { isAuth, signout } from '../helpers/auth'
import * as firebase from 'firebase'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import Geocode from 'react-geocode'
import { HiUserCircle, HiOutlineArrowRight, HiPhone, HiOutlineMailOpen } from 'react-icons/hi'
import { IoLogoWhatsapp } from 'react-icons/io5'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { toast, ToastContainer } from 'react-toastify';
import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 25.20, lng: 55.276 };
const DefaultZoom = 10;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "220",
        color: 'rgb(255, 176, 0)',
        borderBottom: "none"
    },
}));

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: 'rgb(255,176,0)' }
    }
    else {
        return { color: "#3A3A3A" };
    }
}                                        // Dishes  name  

const Menu = ({ history, match }) => {
    const classes = useStyles();

    const [cat, setCat] = useState([])
    const [Dishes, setDishes] = useState([])
    const db = firebase.firestore()
    const [loca, setloca] = useState('Dubai')
    const [locinput, setLocinput] = useState(false)
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [timeRes, setTimeRes] = useState([])
    const [selectedTime, setSelectedTime] = useState([])
    const [dDate, setDate] = useState(new Date(new Date().getTime() + (3600000 * 4) + (1800000)).toISOString().substring(0, 10));

    Geocode.setApiKey('AIzaSyAXFXYI7PBgP9KRqFHp19_eSg-vVQU-CRw')

    const GetGeocode = (lat, lng) => {
        Geocode.fromLatLng(lat.toString(), lng.toString()).then(
            async ress => {
                const address1 = await ress.results[0].formatted_address;
                console.log(address1)
                const funct = () => setloca(address1)
                setTimeout(funct(), 1000)
            }
        )
    }

    function handleChangeLocation(lat, lng) {
        GetGeocode(lat, lng)
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    useEffect(() => {
        const hamburger = document.querySelector('.hamburger');
        const navlinks = document.querySelector('.navlink')

        hamburger.addEventListener("click", () => {
            navlinks.classList.toggle("open");
        })
    }, [])

    useEffect(() => {
      db.collection('Timeslots').doc('Timeslots').get()
      .then((res) => {
        setTimeRes(res.data())
      })
    }, [])

    useEffect(() => {
        const navlinks = document.querySelector('.navlink')

        navlinks.classList.remove("open");
    },[match.params])

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
    }, [])

    const LocationSelect = () => {
        console.log(MapPicker);
        return (
            <div style={{ position: "absolute", zIndex: "1000", backgroundColor: "white", padding: "10px" }}>
                <MapPicker defaultLocation={location}
                    zoom={zoom}
                    style={{ height: '300px', width: '300px' }}
                    onChangeLocation={handleChangeLocation}
                    onChangeZoom={handleChangeZoom}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                <Button onClick={() => setLocinput(!locinput)}><i class="fa fa-times" /></Button>
            </div>
        )
    }

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

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.permissions.query({ name: 'geolocation' })
    //             .then((res) => {
    //                 // if (res.state === 'granted') {
    //                 // console.log(res.state)
    //                 navigator.geolocation.getCurrentPosition(function (position) {
    //                     // console.log("Latitude is :", position.coords.latitude);
    //                     // console.log("Longitude is :", position.coords.longitude);
    //                     Geocode.setApiKey('AIzaSyAXFXYI7PBgP9KRqFHp19_eSg-vVQU-CRw')
    //                     Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
    //                         async ress => {
    //                             // const address = await ress.results[0].formatted_address;
    //                             const address1 = await ress.results[0].address_components[3].long_name;
    //                             setloca(address1)
    //                         }
    //                     )
    //                 })
    //                 // } else if (res.state === 'prompt') {
    //                 //     console.log(res.state)
    //                 // } else if (res.state === 'denied') {
    //                 //     console.log(res.state)
    //                 // }
    //             })
    //     } else {
    //         toast.error('Geolocation is not supported')
    //     }
    // }, [])

    const handleClick = () => {
        firebase.auth().signOut();
        signout(() => {
            
        })
    }

    return (
        <div className="menu-bar">
            <ToastContainer />
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
                                style={{ width: 230, 'margin-top': '11px', height: '85px', scrollbarWidth: 'none', borderRadius: '6px' }}
                                renderInput={(params) =>
                                    <TextField {...params} type="text" placeholder="I'm Searching For" value={values.name} className='malay-searchbar' />}
                            />
                        </Form.Group>
                        <div className="men2123">
                            {
                                values.name && !values.category &&
                                <Link style={isActive(history, `/dish/search/${values.name}`)} to={{ pathname: `/dish/search/${values.name}`, state: { search: `${values.name}` } }}><button><i class="fa fa-search" aria-hidden="true"></i> Search</button></Link>
                            }
                            {
                                values.category && !values.name &&
                                <Link style={isActive(history, `/shop/${values.category}`)} to={{ pathname: `/shop/${values.category}`, state: { search: `${values.name}` } }}><button><i class="fa fa-search" aria-hidden="true"></i> Search</button></Link>
                            }
                            {
                                values.category && values.name ?
                                    <Link style={isActive(history, `/shop/${values.category}`)} to={{ pathname: `/shop/${values.category}`, state: { search: `${values.name}` } }}><button><i class="fa fa-search" aria-hidden="true"></i> Search</button></Link>
                                    :
                                    null
                            }
                            {
                                !values.category && !values.name &&
                                <button onClick={() => { toast.error('Please Select Category or Name') }}><i class="fa fa-search" aria-hidden="true"></i> Search</button>
                            }
                        </div>
                    </div>

                    <div className='header-extra'>
                        <div className='header-extra1'>
                            <div className='header-extra11'>
                                <div className='header-extra12' style={{ cursor: "pointer" }} onClick={() => setLocinput(!locinput)}>
                                    <i class="fa fa-map-marker" aria-hidden="true" ></i> Deliver to :  {loca}
                                </div>
                                {locinput ? <LocationSelect /> : null}
                            </div>
                            <div className='header-extra13'>
                                <div className='header-extra14' style={{display: 'flex', alignItems: 'center'}}>
                                    
                                    <TextField
                                      id="date"
                                      type="date"
                                      defaultValue={dDate}
                                      className={classes.textField}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                      error
                                      onChange={(e) => setDate(e.target.value)}
                                      label={
                                        dDate < (new Date(new Date().getTime() + (3600000 * 4) + (1800000)).toISOString().substring(0, 16)) ? "Choose Valid Date" : "Schedule Delivery"
                                      }
                                    />
                                    <Form.Control as="select" style={{width: 'max-content'}}>
                                      <option>Select Time</option>
                                      {
                                        timeRes && timeRes.Timeslots && timeRes.Timeslots.map((m, l) =>
                                          <option value={m}> {m} </option>
                                        )
                                      }
                                     </Form.Control>
                                </div>
                            </div>
                        </div>
                        <div className='header-extra2'>
                            {
                                !isAuth() &&
                                <p>
                                    {!isAuth() && <Link onClick={changeScreen} style={isActive(history, '/login')} to='/login' className='bhaagi2'><i class="fa fa-user-circle-o" aria-hidden="true"></i> Login /</Link>}
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
                                        <Link onClick={changeScreen} style={isActive(history, '/user/dashboard/address')} to='/user/dashboard/address'>Address</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/user/dashboard/resetpassword')} to='/user/dashboard/resetpassword'>Reset Password</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/wishlist')} to='/wishlist'>Wishlist</Link>
                                        <Link onClick={changeScreen} style={isActive(history, '/dafasd')} to='/' onClick={handleClick}>Logout</Link>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='header-extra3'>
                            <Link onClick={changeScreen} style={isActive(history, '/cart')} to='/cart' className='bhaagi2'><i class="fa fa-shopping-cart" aria-hidden="true"></i>&nbsp; My Cart</Link>
                        </div>
                    </div>

                    <div className='header-extraa'>
                        <div>{<a href="#"><HiPhone style={{ fontSize: '23px' }} /></a>}</div>
                        <div>{<a href='#'><HiOutlineMailOpen style={{ fontSize: '26px', paddingBottom: '1.6px' }} /></a>}</div>
                        <div><a href="#"><IoLogoWhatsapp style={{ fontSize: '25px', paddingBottom: '1.6px' }} /></a></div>
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

                        <div className='titeel1'>
                            <div className='titek'>
                                {!isAuth() &&
                                    <Link to='/login'><h5><span><HiUserCircle /></span>Sign In/Sign Up<span><HiOutlineArrowRight /></span></h5></Link>}
                            </div>
                            <div>
                                {isAuth() &&
                                    <div className='titek'>
                                        <div><img src={`${isAuth().pUrl}`} alt='profile pic' /></div>
                                        <div>
                                            <h6>{isAuth().Name}</h6>
                                            <p>{isAuth().mail}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

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