import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'

const Editdish = ({ match }) => {

    const [values, setValues] = useState({
        name: '',
        image: null,
        top: false,
        photo: '',
        iPrice: '',
        price: '',
        special: false,
        description: '',
        rating: '0',
        category: ''
    })
    const [cat, setCat] = useState([])
    const db = firebase.firestore()
    const _id = match.params.dishname

    const { name, image, top, photo, iPrice, price
        , special, description, rating, category } = values

    useEffect(() => {
        db.collection('Dishes').doc(_id).get()
            .then(res => {
                setValues({
                    ...values, name: res.data().name, price: res.data().price, iPrice: res.data().iPrice,
                    description: res.data().description, photo: res.data().url, category: res.data().category,
                    special: res.data().special, top: res.data().top
                })
            })

        db.collection('Categories').get()
            .then(res => {
                setCat([])
                res.forEach((doc) => {
                    setCat(cat => [...cat, doc.data()])
                })
            })
    }, [])

    const delCat = () => {
        db.collection("Dishes").doc(_id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
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
            <h2>Add Dishes</h2>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Name" onChange={handleChange('name')} value={name} />
                </Form.Group>
                <Form.Group>
                    <Form.Label >Choose Images</Form.Label>
                    <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image')} />
                </Form.Group>
                <div>
                    <img src={photo} style={{ height: '110px', width: '110px' }} />
                </div>
                <Form.Group >
                    <Form.Label>Choose category</Form.Label><br />
                    {category}
                    <select onChange={handleChange('category')} >
                        <option>Please Select</option>
                        {cat && cat.map((c, i) =>
                            (<option key={i} value={c.catName}>
                                {c.catName}
                            </option>)
                        )}
                    </select>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Choose Top </Form.Label><br />
                    {JSON.stringify(top)}
                    <select onChange={handleChange('top')} >
                        <option>Please Select</option>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Choose special </Form.Label><br />
                    {JSON.stringify(special)}
                    <select onChange={handleChange('special')} >
                        <option>Please Select</option>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Price" onChange={handleChange('price')} value={price} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="iPrice" onChange={handleChange('iPrice')} value={iPrice} />
                </Form.Group>
                <div>
                    <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger" >
                        Create Category
                </Button>
                </div>
            </Form>
            <button onClick={delCat} >Delete</button>
        </div>
    );
};

export default Editdish;