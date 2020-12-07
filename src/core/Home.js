import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import { Col, Container, Row, Carousel, Form } from 'react-bootstrap'
import '../Styles/home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    const [cat, setCat] = useState([])
    const db = firebase.firestore()
    const [resu, setResh] = useState([])
    const [catres, setCatres] = useState([])
    const [cs, setCs] = useState('')
    const [imgurll, setImgurl] = useState([])
    const [specia, setSpecial] = useState([])
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    useEffect(() => {
        setImgurl([])
        db.collection('Background').get()
            .then(res => {
                res.forEach((doc) => {
                    setImgurl(imgurll => [...imgurll, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

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
        setSpecial([])
        db.collection("Dishes").where("top", "==", true).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                })
            })
        db.collection("Dishes").where("special", "==", true).get()
            .then(res => {
                res.forEach((doc) => {
                    setSpecial(resu => [...resu, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        if (cs == '') {
            setCatres([])
            db.collection("Dishes").where("category", "==", 'Snacks').get()
                .then(res => {
                    res.forEach((doc) => {
                        setCatres(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        } else {
            setCatres([])
            db.collection("Dishes").where("category", "==", `${cs}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setCatres(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
    }, [cs])

    const handleChange = name => (e) => {
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

    return (
        <div className="ckk hwami">
            <div className='ohdoljag'>
                {           /*     <div className='ohdoljag1'>
                    <div className="ohdoljag11">
                        <input type='text' placeholder='Find Products' />
                        <Link to={{ pathname: `/shop/${values.category}`, state: { search: `${values.name}` } }}><button><i class="fa fa-search" aria-hidden="true"></i> Search</button></Link>
                    </div>
    </div>*/}
                <div className='ohdoljag2'>
                    <div className='ohdoljag21'>
                        <i class="fa fa-map-marker" aria-hidden="true"></i> Deliver to, Delhi
                    </div>
                </div>
                <div className='ohdoljag3'>
                    <div className='ohdoljag31'>
                        Next Delivery: <i class="fa fa-motorcycle" aria-hidden="true"></i> 26/10 at <i class="fa fa-clock-o" aria-hidden="true"></i> 9:00 AM
                    </div>
                </div>
            </div>
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
                            catres && catres.map((d, k) => (
                                <Col lg={4} xl={3} key={k} sm={6} xs={6} className="homey1">
                                    <Card product={d} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>

            <div className="halkkaa">
                {
                    imgurll[0] &&
                    <img
                        src={imgurll[0].data.url}
                        className="d-block w-100"
                        alt='banner' />
                }
            </div>

            <h5 className="snitch">Top on <span>Angadi</span></h5>
            <div className="homey">
                <Container fluid>
                    <Row>
                        {
                            resu && resu.map((d, k) => (
                                <Col lg={4} xl={3} key={k} sm={6} xs={6} className="homey1">
                                    <Card product={d} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>

            <div className="halkka">
                {
                    imgurll[1] &&
                    <img
                        src={imgurll[1].data.url}
                        className="d-block w-100"
                        alt='banner' />
                }
            </div>

            <h5 className="snitch">Special on <span>Angadi</span></h5>
            <div className="homey">
                <Container fluid>
                    <Row>
                        {
                            specia && specia.map((d, k) => (
                                <Col lg={4} xl={3} key={k} sm={6} xs={6} className="homey1">
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