import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import Card from '../Csshelper/Dishcard'
import { Form } from 'react-bootstrap'

const Getcategory = () => {
    const [dish, setDish] = useState([])
    const [resu, setResh] = useState([])
    const [cat, setCat] = useState([])
    const [values, setValues] = useState({
        name: '',
        category: ''
    })

    const db = firebase.firestore()

    useEffect(async () => {
        setDish([])
        await db.collection('Dishes').get()
            .then(res => {
                res.forEach((doc) => {
                    setDish(dish => [...dish, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    useEffect(() => {
        setCat([])
        db.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])


    var catRef = db.collection('Dishes');

    const getspecific = () => {
        if (values.name == '') {
            setResh([])
            catRef.where("category", "==", `${values.category}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh(resu => [...resu, { data: doc.data(), _id: doc.id }])
                    })
                })
        } else {
            catRef.where("name", "==", `${values.name}`).get()
                .then(res => {
                    res.forEach((doc) => {
                        setResh([{ data: doc.data(), _id: doc.id }])
                    })
                })
        }
    }

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
        <div>
            <div>
                <Form.Group >
                    <Form.Label>Search By Name</Form.Label><br />
                    <Form.Control type="text" placeholder="Name" onChange={handleChange('name')} value={values.name} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Choose category</Form.Label><br />
                    <select onChange={handleChange('category')} >
                        <option>Please Select</option>
                        {cat.map((c, i) =>
                            (<option key={i} value={c.data.catName}>
                                {c.data.catName}
                            </option>)
                        )}
                    </select>
                </Form.Group>
                <button onClick={getspecific}>click</button>
            </div>
            <div>
                {resu.length == 0 ?
                    <div>
                        {
                            dish && dish.map((d, k) => (
                                <div key={k}>
                                    <Card product={d} />
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div>
                        <h4>{resu.length} result found</h4>
                        {
                            resu && resu.map((d, k) => (
                                <div key={k}>
                                    <div>
                                        <Card product={d} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }
                <div>
                </div>
            </div>
        </div>
    );
};

export default Getcategory;