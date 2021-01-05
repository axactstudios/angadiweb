import React, { useState, useEffect } from 'react';
import { HiShoppingCart } from 'react-icons/hi'
import '../Styles/cartttt.css'
import { Modal, Button } from 'react-bootstrap'
import { getCart, itemTotal } from '../helpers/CartHelper'
import Card from './Homecart'
import { Link } from 'react-router-dom'

function MyVerticallyCenteredModal(props) {

    const [items, setItems] = useState([]);
    const [d, setd] = useState(5)

    var min = 1;
    var max = 100;
    var rand = min + (Math.random() * (max - min));

    const setdm = () => {
        setd(rand)
    }

    useEffect(() => {
        setItems(getCart());
    }, [])

    const noItemsMessage = () => {
        return (
            <h6 className="mmain1"><Link className="mmain" to='/shop'>Continue Shopping</Link></h6>
        )
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center' }}>
                    My Cart
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="maincart2">
                    {
                        items.length > 0 ?
                            <div>
                                {
                                    items && items.map((d, k) => (
                                        <Card key={k} product={d} dm={d} setdm={setdm} />
                                    ))
                                }
                            </div>
                            : noItemsMessage()
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className='check-out-modal'><Link to='/cart' style={{ color: 'inherit' }}>Check Out</Link></button>
            </Modal.Footer>
        </Modal>
    );
}

const Cartt = () => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <div className='cart-home-comp-head'>
            {
                window.innerWidth < 450 ?
                    <div className='cart-home-comp'>
                        <div className='cart-home-comp1' onClick={() => setModalShow(true)}>
                            <HiShoppingCart />
                        </div>
                    </div>
                    :
                    null
            }
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
};

export default Cartt;