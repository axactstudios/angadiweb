import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'
import '../Styles/Footer.css'
import IOS from '../Assests/IOS.svg'
import PLAY from '../Assests/play.svg'

const Footer = () => {
    return (
        <div className="home15">
            <div className="home16">
                <Container fluid>
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
                                        <a href="#" className="btn btn-lg text-white"><i className="fa fa-facebook"></i></a>

                                    </Col>
                                    <Col sm={4} xs={4} className="">
                                        <a href="#" className="btn btn-lg text-white"><i className="fa fa-twitter"></i></a>
                                    </Col>
                                    <Col sm={4} xs={4} className="">
                                        <a href="#" className="btn btn-lg text-white"><i className="fa fa-linkedin"></i></a>
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
                    <Row>
                        <div className="home21">
                            <p>@2020, Angadi. All Rights Reserved</p>
                        </div>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Footer;