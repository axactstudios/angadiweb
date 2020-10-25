import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Card'

const Getcategory = () => {
    const [cat, setCat] = useState([])

    const db = firebase.firestore()

    useEffect(async () => {
        await db.collection('Categories').get()
            .then(res => {
                res.forEach(doc => {
                    setCat(cat => [...cat, doc.data()])
                })
            })
    }, [])

    return (
        <div>
            {
                cat.map((d, k) => (
                    <div key={k}>
                        <Card product={d} />
                    </div>
                ))
            }
        </div>
    );
};

export default Getcategory;