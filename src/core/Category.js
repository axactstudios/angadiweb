import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../PagesHelper/Card'
import { Col, Container, Row } from 'react-bootstrap'

const Category = ({ match }) => {

    const db = firebase.firestore()
    const [resu, setResh] = useState([])
    const cs = match.params.categoryId
    const cd = match.params.categoryName

    const md = cd && `${cs}/${cd}`

    useEffect(() => {
        if (cd) {
            setResh([])
            db.collection("Dishes").where("category", "==", `${md}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        }
        else {
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
        <div>
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
    );
};

export default Category;