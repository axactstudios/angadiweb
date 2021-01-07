import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Offercard'
import '../Csshelper/card.css'

const Getoffer = () => {

    const [dish, setDish] = useState([])
    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Offers').get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    return (
        <div>

            <div className='content1'>
                <h2 style={{ textAlign: 'center' }}>All Offers</h2>
                <div className='cateegee'>
                    {
                        dish && dish.map((d, i) => (
                            <div key={i}>
                                <Card product={d} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Getoffer;