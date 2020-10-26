import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import { Col, Container, Row } from 'react-bootstrap'

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
        if(cs == ''){
            setCs('')
        }else{
            setResh([])
            db.collection("Dishes").where("category", "==", `${cs}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
    },[cs])

    return (
        <div>
            <div className="cskk">
                <div className="cskk3">
                    <ul className="cskk4">
                        {
                            cat && cat.map((d, k) => (
                                <li key={k}>
                                    <div className="cskk5" onClick={() => {setCs(d.data.catName)}}>
                                        <img src={d.data.imageURL} />
                                        <p>{d.data.catName}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <Container fluid>
                    <Row>
                        {
                            resu && resu.map((d, k) => (
                                <Col lg={3} md={4} key={k} sm={6} xs={12}>
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

// useEffect(() => {
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             console.log(user)
//         } else {
//             console.log('No user found')
//         }
//     })
// }, [])
