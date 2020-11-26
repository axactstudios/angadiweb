import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { isAuth } from '../helpers/auth'
import { Row, Col, Container } from 'react-bootstrap'
import '../Styles/myorder.css'

const Myadds = () => {

    const db = firebase.firestore()
    const [resu, setResh] = useState([])

    useEffect(() => {
        setResh([])
        db.collection("Orders").where("UserID", "==", `${isAuth().id}`).get()
            .then(res => {
                res.forEach((doc) => {
                    setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    return (
        <div className="myor"> 
            {
                resu.length === 0 ?
                    <h2>No Order Now!!!</h2>
                    :
                    <h2>{resu.length} Orders Found</h2>
            }
            {
                resu && resu.map((q, w) => (
                    <div key={w} className="myor1">
                        <h5>OrderId- {q._id}</h5>

                        <Container fluid>
                            <Row>
                                <Col xs={7} sm={4}>
                                    <div className="myor2">
                                        <h6>Items</h6>
                                        {q.data.Items.map((e, r) => (
                                            <p key={r}>
                                                {e && e.substring(0,18)}
                                            </p>
                                        ))}
                                    </div>
                                </Col>
                                <Col xs={2} sm={4}>
                                    <div className="myor2">
                                        <h6>Qty</h6>
                                        {q.data.Qty.map((t, y) => (
                                            <p key={y}>
                                                {t}
                                            </p>
                                        ))}
                                    </div>
                                </Col>
                                <Col xs={3} sm={4}>
                                    <div className="myor2">
                                        <h6>Price</h6>
                                        {q.data.Price.map((u, i) => (
                                            <p key={i}>
                                                <i class="fa fa-inr" aria-hidden="true"></i>{u}
                                            </p>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        <p className="myor3"><span>Total-</span> <i class="fa fa-inr" aria-hidden="true"></i> {q.data.GrandTotal}</p>
                        <h6>{q.data.Status}</h6>
                    </div>
                ))
            }
        </div>
    );
};

export default Myadds;
