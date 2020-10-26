import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'

const Product = ({ match }) => {

    const db = firebase.firestore()
    const _id = match.params.dishId
    const [pro, setPro] = useState()

    useEffect(async () => {
        await db.collection('Dishes').doc(_id).get()
            .then(res => {
                setPro(res.data())
            })
    }, [])

    return (
        <div>
            <div>
                {pro && pro.name && pro.url ?
                    <div>
                        <img src={pro.url} alt={pro.name} />
                        <h5>{pro.name}</h5>
                        <ul>
                            <li>description : {pro.description}</li>
                            <li>iPrice: {pro.iPrice}</li>
                            <li>price: {pro.price}</li>
                            <li>rating: {pro.rating}</li>
                        </ul>
                    </div> :
                    null
                }
            </div>
        </div>
    );
};

export default Product;