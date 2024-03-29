import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap'
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import '../Styles/shop.css'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const Shop = (props) => {
    const [special, setSpecial] = useState([])
    const [Dishes, setDishes] = useState([])
    const [dish, setDish] = useState([])
    const [resu, setResh] = useState([])
    const [cat, setCat] = useState([])
    const [showw, setShoww] = useState(false)
    const [values, setValues] = useState({
        name: '',
        category: '',
        price: '',
        sCat: ''
    })

    const cs = props.match.params.categoryId
    const cd = props.match.params.categoryName
    const md = cd && `${cs}/${cd}`
    const mss = props.location.state && props.location.state.search

    useEffect(() => {
        setDishes([])
        db.collection('Dishes').get()
            .then(res => {
                res.forEach((doc) => {
                    setDishes(Dishes => [...Dishes, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        setCat([])
        setSpecial([])
        db.collection('Dishes').where("special", "==", true).limit(5).get()
            .then(res => {
                res.forEach((doc) => {
                    setSpecial(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
        db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })

        const hamburgers = document.querySelector('.slidddeee');
        const navlinkss = document.querySelector('.slidddee')

        hamburgers.addEventListener("click", () => {
            navlinkss.classList.toggle("open");
        })
    }, [])

    const db = firebase.firestore()
    var catRef = db.collection('Dishes');

    const getsearch = () => {
        setShoww(true)
        setResh([])
        catRef.where("nameSearch", "array-contains", `${values.name}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh([{ data: doc.data(), _id: doc.id }])
                })
            })
    }

    useEffect(() => {
        setShoww(false)
        setValues({ ...values, name: mss })
        if (cd) {
            setDish([])
            db.collection("Dishes").where("category", "==", `${md}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setDish(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
        if (cs) {
            setDish([])
            db.collection("Dishes").where("category", "==", `${cs}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setDish(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
        else {
            setDish([])
            db.collection('Dishes').where("top", "==", true).get()
                .then(res => {
                    res.forEach((doc) => {
                        setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }, [cs])

    const onInputChange = (event, value) => {
        setValues({ ...values, name: value })
    }

    const handleChange = name => (e) => {
        setResh([])
        setShoww(true)
        setValues({ ...values, [name]: e.target.value })

        if (name == 'category') {
            setResh([])
            const q = e.target.value
            if (values.sCat || values.price) {
                setResh([])
                if (values.sCat && !values.price) {
                    setResh([])
                    catRef.where("category", "==", `${q}`)
                        .where('sCat', '==', `${values.sCat}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                if (values.price && !values.sCat) {
                    setResh([])
                    catRef.where("category", "==", `${q}`)
                        .where('price', '<', `${values.price}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                else {
                    setResh([])
                    catRef.where("category", "==", `${q}`)
                        .where('price', '<', `${values.price}`)
                        .where('sCat', '==', `${values.sCat}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
            }
            else {
                setResh([])
                catRef.where("category", "==", `${q}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                        })
                    })
            }
        }
        if (name == 'sCat') {
            const w = e.target.value
            setResh([])
            if (values.price || values.category) {
                setResh([])
                if (values.category && !values.price) {
                    setResh([])
                    catRef.where("category", "==", `${values.category}`)
                        .where('sCat', '==', `${w}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                if (values.price && !values.category) {
                    setResh([])
                    catRef.where("price", "<", `${values.price}`)
                        .where('sCat', '==', `${w}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                else {
                    setResh([])
                    catRef.where("category", "==", `${values.category}`)
                        .where('sCat', '==', `${w}`)
                        .where("price", "<", `${values.price}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
            }
            else {
                setResh([])
                catRef.where("sCat", "==", `${w}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                        })
                    })
            }
        }
        if (name == 'price') {
            const r = e.target.value
            setResh([])
            if (values.category || values.sCat) {
                setResh([])
                if (values.category && !values.sCat) {
                    setResh([])
                    catRef.where("category", "==", `${values.category}`)
                        .where('price', '<', `${r}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                if (values.sCat && !values.category) {
                    setResh([])
                    catRef.where("sCat", "==", `${values.sCat}`)
                        .where('price', '<', `${r}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
                else {
                    setResh([])
                    catRef.where("sCat", "==", `${values.sCat}`)
                        .where('price', '<', `${r}`)
                        .where('category', '==', `${values.category}`)
                        .get()
                        .then(res => {
                            res.forEach((doc) => {
                                setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            })
                        })
                }
            }
            else {
                setResh([])
                catRef.where("price", "<", `${r}`).get()
                    .then(res => {
                        res.forEach((doc) => {
                            setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                            setShoww(true)
                        })
                    })
            }
        }
        $(document).ready(function () {
            $(this).scrollTop(0);
        });
    }

    const handechange = name => (e) => {
        setValues({ ...values, [name]: e.target.value })
        setShoww(false)
    }

    const toaast = (k) => {
        if (k) {
            toast.success('Item Added !!!')
        }
    }

    return (
        <div className='hwami'>
            <ToastContainer />
            <div className="homey2 cde">
                <Container fluid>
                    <div className="shopi">
                        <Row>
                            <Col lg={10} sm={10} xs={9}>
                                <Form.Group className='tra-ra'>
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={Dishes}
                                        getOptionLabel={(option) => option.data.name}
                                        onInputChange={onInputChange} //** on every input change hitting my api**
                                        style={{ width: '100%' }}
                                        renderInput={(params) =>
                                            <TextField {...params} type="text" placeholder="I'm Searching For" value={values.name} style={{border:'1px solid #c2c2c2', height:'40px', borderRadius:'5px 0 0 5px'}}/>}
                                    />
                                </Form.Group>
                            </Col>
                            <Col lg={2} sm={2} xs={3}>
                                <button onClick={getsearch} className='tera-yarr-hoo'>Search</button>
                            </Col>
                        </Row>
                    </div>
                    <Row>
                        <Col lg={{ span: 3, order: 1 }} sm={{ span: 12, order: 2 }} xs={{ span: 12, order: 2 }} className='sliddde'>
                            <div className="shopii1">
                                <div className="shopi1">
                                    <p>Sort By Category</p>
                                    <Form.Group >
                                        <select onChange={handleChange('category')} >
                                            <option>Please Select</option>
                                            {cat.map((c, i) =>
                                            (<option key={i} value={c.data.catName}>
                                                {c.data.catName}
                                            </option>)
                                            )}
                                        </select>
                                    </Form.Group>
                                </div>
                                <div className="shopi2">
                                    <p>Sort By Price</p>
                                    <input type="radio" name="Price" value="400" onChange={handleChange('price')} />
                                    <label > Less than AED 400</label><br />
                                    <input type="radio" name="Price" value="500" onChange={handleChange('price')} />
                                    <label > Less than AED 500</label><br />
                                    <input type="radio" name="Price" value="600" onChange={handleChange('price')} />
                                    <label > Less than AED 600</label><br />
                                    <input type="radio" name="Price" value="800" onChange={handleChange('price')} />
                                    <label > Less than AED 800</label><br />
                                    <input type="radio" name="Price" value="900" onChange={handleChange('price')} />
                                    <label > Less than AED 900</label><br />
                                </div>
                                <div className="shopi3">
                                    <p>Sort by Sub Category</p>
                                    <input type="radio" name="Food" value="Food" onChange={handleChange('sCat')} />
                                    <label > Food</label><br />
                                    <input type="radio" name="Food" value="Grocery" onChange={handleChange('sCat')} />
                                    <label > Grocery</label><br />
                                </div>
                            </div>

                            <div className='cnpp'>
                                <h5>Special Products</h5>
                                {
                                    special.map((x, c) => (
                                        <Link to={`/dish/${x._id}`}>
                                            <div className='cnpp1'>
                                                <div className='cnpp2'>
                                                    <img src={x.data.url} alt="special product" />
                                                </div>
                                                <div className='cnpp3'>
                                                    <h6>{x.data.name}</h6>
                                                    <p>AED {x.data.price}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </Col>
                        <Col lg={{ span: 9, order: 2 }} sm={{ span: 12, order: 1 }} xs={{ span: 12, order: 1 }}>
                            <div className="shopii2">
                                <button className='slidddeee'><i class="fa fa-bars" aria-hidden="true"></i></button>
                                {showw == false ?
                                    <div style={{ width: '100%' }}>
                                        <h5> Showing all {dish.length} results</h5>
                                        <Container fluid>
                                            <Row>
                                                {
                                                    dish && dish.map((d, k) => (
                                                        <Col lg={6} xl={4} key={k} sm={6} xs={6} className="homey1 shopii3">
                                                            <Card product={d} toaaat={toaast} />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Container>
                                    </div>
                                    :
                                    <div>
                                        <h5>{resu.length} result found</h5>
                                        <Container fluid>
                                            <Row>
                                                {
                                                    resu && resu.map((d, k) => (
                                                        <Col lg={6} xl={4} key={k} sm={6} xs={6} className="homey1 shopii3">
                                                            <Card product={d} toaaat={toaast} />
                                                        </Col>
                                                    ))
                                                }
                                            </Row>
                                        </Container>
                                    </div>
                                }
                                <div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>


            <div className='slidddee'>
                <div className="shopii1">
                    <div className="shopi1">
                        <p>Sort By Category</p>
                        <Form.Group >
                            <select onChange={handleChange('category')} >
                                <option>Please Select</option>
                                {cat.map((c, i) =>
                                (<option key={i} value={c.data.catName}>
                                    {c.data.catName}
                                </option>)
                                )}
                            </select>
                        </Form.Group>
                    </div>
                    <div className="shopi2">
                        <p>Sort By Price</p>
                        <input type="radio" name="Price" value="400" onChange={handleChange('price')} />
                        <label > Less than AED 400</label><br />
                        <input type="radio" name="Price" value="500" onChange={handleChange('price')} />
                        <label > Less than AED 500</label><br />
                        <input type="radio" name="Price" value="600" onChange={handleChange('price')} />
                        <label > Less than AED 600</label><br />
                        <input type="radio" name="Price" value="800" onChange={handleChange('price')} />
                        <label > Less than AED 800</label><br />
                        <input type="radio" name="Price" value="900" onChange={handleChange('price')} />
                        <label > Less than AED 900</label><br />
                    </div>
                    <div className="shopi3">
                        <p>Sort by Sub Category</p>
                        <input type="radio" name="Food" value="Food" onChange={handleChange('sCat')} />
                        <label > Food</label><br />
                        <input type="radio" name="Food" value="Grocery" onChange={handleChange('sCat')} />
                        <label > Grocery</label><br />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Shop;