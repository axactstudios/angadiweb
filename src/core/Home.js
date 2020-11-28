import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import { Col, Container, Row, Carousel } from 'react-bootstrap'
import Ing from '../images/poster3.jpg'


import '../Styles/home.css'

const Home = () => {
    const [cat, setCat] = useState([])
    const db = firebase.firestore()
    const [resu, setResh] = useState([])
    const [cs, setCs] = useState('')
    const [imgurll, setImgurl] = useState([])

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
        setImgurl([])
        db.collection('Background').get()
            .then(res => {
                res.forEach((doc) => {
                    setImgurl(imgurll => [...imgurll, { data: doc.data(), _id: doc.id }])
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
        <div className="ckk hwami">
            <div className="cskkk">
                <Carousel interval={2500}>
                    {
                        imgurll && imgurll.map((d, k) =>
                            (
                                <Carousel.Item interval={2500}>
                                    <img src={d.data.url}
                                        className="d-block w-100"
                                        alt={k} />
                                </Carousel.Item>

                            ))
                    }
                </Carousel>
            </div>

            <h5 className="snitch">Homemade Tasty <span>Products</span></h5>
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