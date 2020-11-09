import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import { Col, Container, Row, Carousel } from 'react-bootstrap'
import Ing from '../images/poster3.jpg'
import Ing2 from '../images/poster.jpg'
import Ing4 from '../images/poster1.jpg'
import '../Styles/home.css'

const Home = () => {
    const [cat, setCat] = useState([])
    const db = firebase.firestore()
    const [resu, setResh] = useState([])
    const [cs, setCs] = useState('')

    useEffect(async () => {
        setCat([])
        await db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        setResh([])
        db.collection("Dishes").where("top", "==", true).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        if (cs == '') {
            setCs('')
        } else {
            setResh([])
            db.collection("Dishes").where("category", "==", `${cs}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
    }, [cs])

    return (
        <div className="ckk">
            <div className="cskkk">
                <Carousel>
                    <Carousel.Item interval={2500}>
                        <img
                            className="d-block w-100"
                            src={Ing}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img
                            className="d-block w-100"
                            src={Ing2}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Ing4}
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div class="mu-title">
                <span class="mu-subtitle">Discover</span>
                <h2>Our Products</h2>
            </div>
            <div className="cskk">
                <div className="cskk3">
                    <ul className="cskk4">
                        {
                            cat && cat.map((d, k) => (
                                <li key={k}>
                                    <div className="cskk5" onClick={() => { setCs(d.data.catName) }}>
                                        <img src={d.data.imageURL} />
                                        <p>{d.data.catName}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            <div className="homey">
                <Container fluid>
                    <Row>
                        {
                            resu && resu.map((d, k) => (
                                <Col lg={4} xl={3} key={k} sm={6} xs={12} className="homey1">
                                    <Card product={d} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Home;