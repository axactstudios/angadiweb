import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import '../Styles/Footer.css'
import IOS from '../Assests/IOS.svg'
import PLAY from '../Assests/play.svg'
import $ from 'jquery'
import { Link, withRouter } from 'react-router-dom'
import { itemTotal } from '../helpers/CartHelper'

const Footer = ({history}) => {

    const upwardmove = () => {
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }

    const isActive = (history, path) => {
        if (history.location.pathname === path) {
            return { color: '#653602' }
        }
        else {
            return { color: "white" };
        }
    }
    

    return (
        <>
            <div className="home15">
                <div className='bheegi'>
                    <div className="home16">
                        <Container>
                            <Row>
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <div className="home17">
                                        <h3>Trending Dishes</h3>
                                        <ul>
                                            <li><a href="jdfakkl">XYZ</a></li>
                                            <li><a href="jdfakkl">XYZ</a></li>
                                            <li><a href="jdfakkl">Delhi</a></li>
                                            <li><a href="jdfakkl">Kolkata</a></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <div className="home18">
                                        <h3>About Us</h3>
                                        <ul>
                                            <li><a href="jdfakkl">About Angadi</a></li>
                                            <li><a href="jdfakkl">Careers</a></li>
                                            <li><a href="jdfakkl">Terms and Conditions</a></li>
                                            <li><a href="jdfakkl">Privacy Policy</a></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <div className="home19">
                                        <h3>Help & Support</h3>
                                        <ul>
                                            <li><a href="jdfakkl">Help</a></li>
                                            <li><a href="jdfakkl">Contact Support</a></li>
                                            <li><a href="jdfakkl">Contact Us</a></li>
                                            <li><a href="jdfakkl">FAQ</a></li>
                                        </ul>
                                    </div>
                                </Col>
                                <Col xs={12} sm={6} md={4} lg={3}>
                                    <div className="home20">
                                        <Row className="text-center">
                                            <Col sm={12} className="">
                                                <h3>Follow Us</h3>
                                            </Col>

                                            <Col sm={4} xs={4} className="">
                                                <a href="#" style={{ color: 'rgb(68, 67, 67)' }} className="btn btn-lg"><i className="fa fa-facebook"></i></a>

                                            </Col>
                                            <Col sm={4} xs={4} className="">
                                                <a href="#" style={{ color: 'rgb(68, 67, 67)' }} className="btn btn-lg "><i className="fa fa-twitter"></i></a>
                                            </Col>
                                            <Col sm={4} xs={4} className="">
                                                <a href="#" style={{ color: 'rgb(68, 67, 67)' }} className="btn btn-lg "><i className="fa fa-linkedin"></i></a>
                                            </Col>
                                            <Col sm={12} xs={5} className="text-center m-1">
                                                <a href="#" className="btn m-0">
                                                    <img src={IOS} style={{ widht: '100%' }} />
                                                </a>
                                            </Col>
                                            <Col sm={12} xs={5} className="text-center m-1">
                                                <a href="#" className="btn m-0">
                                                    <img src={PLAY} style={{ widht: '100%' }} />
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="home21">
                        <p>@2020, Angadi. All Rights Reserved</p>
                    </div>
                </div>
                <div className='bhaagi'>
                    <Container>
                        <Row>
                            <Col><Link to='/' className='bhaagi2' style={isActive(history, `/`)}>
                                <div className='bhaagi1'>
                                    <i class="fa fa-home" aria-hidden="true"></i>
                                    <p>Home</p>
                                </div>
                            </Link>
                            </Col>
                            <Col><Link to='/cart' className='bhaagi2' style={isActive(history, `/cart`)}>
                                <div className='bhaagi1'>
                                    <i class="fa fa-shopping-cart" aria-hidden="true"> <sup>{itemTotal()}</sup></i>
                                    <p>Cart</p>
                                </div>
                            </Link>
                            </Col>
                            <Col><Link to='/shop' className='bhaagi2' style={isActive(history, `/shop`)}>
                                <div className='bhaagi1'>
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                    <p>Search</p>
                                </div>
                            </Link>
                            </Col>
                            <Col><Link to='/user/dashboard' className='bhaagi2' style={isActive(history, `/user/dashboard`)}>
                                <div className='bhaagi1'>
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <p>Dashboard</p>
                                </div>
                            </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default withRouter(Footer);

// <div className="foopart1">
// <Container>
//     <Row>
//         <Col md={6}>
//             <div className="foopart21">
//                 <h3>Subscribe to our Newsletter</h3>
//                 <p>Get e-mail update about our latest dish and special offers</p>
//             </div>
//         </Col>
//         <Col md={6}>
//             <div className="foopart22">
//                 <input placeholder="Enter Email Address" />
//                 <button>Subscribe</button>
//             </div>
//         </Col>
//     </Row>
// </Container>
// </div>
// <div onClick={upwardmove} className="foopart2">
// <i className="fa fa-chevron-up" aria-hidden="true"></i>
// </div>
