import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import { Col, Container, Row, Carousel, Button, Form } from 'react-bootstrap'
import '../Styles/home.css'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import Geocode from 'react-geocode'
import Cartcomp from '../PagesHelper/Cartt'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MapPicker from 'react-google-map-picker'

const DefaultLocation = { lat: 25.20, lng: 55.27 };
const DefaultZoom = 10;

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(0.2),
        marginRight: theme.spacing(4),
        color: 'rgb(255, 176, 0)',
        borderBottom: "none"
    },
}));

const Home = () => {
    const classes = useStyles();

    const [cat, setCat] = useState([])
    const db = firebase.firestore()
    const [resu, setResh] = useState([])
    const [catres, setCatres] = useState([])
    const [cs, setCs] = useState('')
    const [imgurll, setImgurl] = useState([])
    const [specia, setSpecial] = useState([])
    const [loca, setloca] = useState('Dubai')
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [location, setLocation] = useState(defaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [locinput, setLocinput] = useState(false)
    const [timeRes, setTimeRes] = useState([])
    const [selectedTime, setSelectedTime] = useState([])
    const [dDate, setDate] = useState(new Date(new Date().getTime() + (3600000 * 4) + (1800000)).toISOString().substring(0, 10));

    Geocode.setApiKey('AIzaSyAXFXYI7PBgP9KRqFHp19_eSg-vVQU-CRw')

    const GetGeocode = (lat, lng) => {
        Geocode.fromLatLng(lat.toString(), lng.toString()).then(
            async ress => {
                const address1 = await ress.results[0].formatted_address;
                console.log(address1)
                setloca(address1)
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

    function handleResetLocation() {
        setDefaultLocation({ ...DefaultLocation });
        setZoom(DefaultZoom);
    }

    const LocationSelect = () => {

        console.log(location)

        return (
            <div style={{ position: "absolute", zIndex: "1000", padding: "10px", backgroundColor: "white" }}>
                <MapPicker defaultLocation={defaultLocation}
                    zoom={zoom}
                    style={{ height: '300px', width: '300px' }}
                    onChangeLocation={handleChangeLocation}
                    onChangeZoom={handleChangeZoom}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8' />
                <Button onClick={() => setLocinput(!locinput)}><i class="fa fa-times" /></Button>
            </div>
        );
    }

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
      db.collection('Timeslots').doc('Timeslots').get()
      .then((res) => {
        setTimeRes(res.data())
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


    const toaast = (k) => {
        if (k) {
            toast.warning('Item Added !!!')
        }
    }

    return (
        <div className="ckk hwami">
            <ToastContainer />
            <div className='ohdoljag'>
                <div className='ohdoljag1'>
                    <div className="ohdoljag11">
                        <input type='text' placeholder='Find Products' />
                        <Link to={{ pathname: `/shop/${values.category}`, state: { search: `${values.name}` } }}><button><i class="fa fa-search" aria-hidden="true"></i> Search</button></Link>
                    </div>
                </div>
                <div className='ohdoljag2'>
                    <div className='ohdoljag21' style={{ cursor: "pointer" }} onClick={() => setLocinput(!locinput)}>
                        <i class="fa fa-map-marker" aria-hidden="true" ></i> Deliver to : {loca}
                    </div>
                    {locinput ? <LocationSelect /> : null}
                </div>
                <div className='ohdoljag3'>
                    <div className='ohdoljag31' style={{display: 'flex', alignItems: 'center'}}>
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
                        <Form.Control as="select">
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
                                    <Card product={d} toaaat={toaast} />
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
                                    <Card product={d} toaaat={toaast} />
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
                                    <Card product={d} toaaat={toaast} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </div>

            <Cartcomp />
        </div>
    );
};

export default Home;