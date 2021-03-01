import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import '../Styles/Footer.css'
import IOS from '../Assests/IOS.svg'
import PLAY from '../Assests/play.svg'
import $ from 'jquery'
import { Link, withRouter } from 'react-router-dom'
import { IoNotificationsSharp } from 'react-icons/io5'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'

const Footer = ({ history }) => {

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
                    <div className='logo'>
                        <img src={'https://www.angadi.ae/wp-content/uploads/2020/06/Angadi-3.jpg'} alt="angadi logo" />
                    </div>

                    <div className="footer-list">
                        <h3>Information</h3>
                        <Link to="/about">About us</Link>
                        <Link to="/refund">Refund & Delivery policy</Link>
                        <Link to="/privacy">Privacy policy</Link>
                        <Link to="/terms">Terms & conditions</Link>
                    </div>

                    <div className="footer-list">
                        <h3>Quick Links</h3>
                        <Link to="/user/dashboard">My account</Link>
                        <Link to="/user/dashboard/myorders">order tracking</Link>
                        <Link to="/wishlist">wishlist</Link>
                        <Link to="/cart">checkout</Link>
                        <Link to="/cart">cart</Link>
                    </div>

                    <div className="footer-list">
                        <h3>Contact Info</h3>
                        <p>+971 50 7175406</p>
                        <p>info@misteridli.com</p>
                        <div className="social-media-icons">
                            <a href='https://www.facebook.com/MisterIdli/' target='_blank'><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href='https://twitter.com/https://twitter.com/MisterIdli' target='_blank'><i class="fa fa-twitter" aria-hidden="true"></i></a>
                        </div>
                    </div>

                    <div className="download">
                        <Link to="#" className="btn m-0">
                            <img src={IOS} style={{ widht: '100%' }} />
                        </Link>
                        <Link to="#" className="btn m-0">
                            <img src={PLAY} style={{ widht: '100%' }} />
                        </Link>
                    </div>
                    <div className="home21">
                        <p>Copyright &copy; 2020 Angadi. All Rights Reserved</p>
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
                            <Col><Link to='/notif' className='bhaagi2' style={isActive(history, `/notif`)}>
                                <div className='bhaagi1'>
                                    <IoNotificationsSharp style={{ fontSize: '23px' }} />
                                    <p>Notification</p>
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
                            <Col id="cate"><Link to='/category' className='bhaagi2' style={isActive(history, `/shop`)}>
                                <div className='bhaagi1'>
                                    <HiOutlineMenuAlt1 style={{fontSize:'24px', fontWeight:'bolder'}}/>
                                    <p>Category</p>
                                </div>
                            </Link>
                            </Col>
                            <Col><Link to='/user/dashboard' className='bhaagi2' style={isActive(history, `/user/dashboard`)}>
                                <div className='bhaagi1'>
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <p>User</p>
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

{/* <Col xs={12} sm={6} md={4} lg={3}>
                                    <div className="home20">
                                        <Row className="text-center">
                                            <Col sm={12} className="">
                                                <h3>Follow Us</h3>
                                            </Col>

                                            <Col sm={4} xs={4} className="">
                                                <Link to="#" style={{ color: 'rgb(68, 67, 67)' }} className="btn btn-lg"><i className="fa fa-facebook"></i></Link>

                                            </Col>
                                            <Col sm={4} xs={4} className="">
                                                <Link to="#" style={{ color: 'rgb(68, 67, 67)' }} className="btn btn-lg "><i className="fa fa-twitter"></i></Link>
                                            </Col>
                                            <Col sm={4} xs={4} className="">
                                                <Link to="#" style={{ color: 'rgb(68, 67, 67)' }} className="btn btn-lg "><i className="fa fa-linkedin"></i></Link>
                                            </Col>
                                            <Col sm={12} xs={5} className="text-center m-1">
                                                <Link to="#" className="btn m-0">
                                                    <img src={IOS} style={{ widht: '100%' }} />
                                                </Link>
                                            </Col>
                                            <Col sm={12} xs={5} className="text-center m-1">
                                                <Link to="#" className="btn m-0">
                                                    <img src={PLAY} style={{ widht: '100%' }} />
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col> */}
