import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'

const AddDish = () => {

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

    const storage = firebase.storage()
    const store = firebase.firestore()

    useEffect(async () => {
        await store.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, doc.data()])
                })
            })
    }, [])

    const { name, image, top, photo, iPrice, price
        , special, description, rating, category } = values

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

    const handleSubmit = async () => {
        const uploadTask = storage.ref(`Dishes/${name}`).child(image.name).put(image);
        await uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
        },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref(`Dishes/${name}`).child(image.name).getDownloadURL().then(async url => {
                    console.log(url)
                    await store.collection('Dishes').add({
                        url: url,
                        name: name,
                        top: top,
                        special: special,
                        rating: rating,
                        iPrice: price,
                        description: description,
                        price: price,
                        category: category
                    }).then(() => {
                        console.log('done')
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            })
    }

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
                    <select onChange={handleChange('top')} >
                        <option>Please Select</option>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Choose special </Form.Label><br />
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
                    <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger" onClick={handleSubmit}>
                        Create Category
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddDish;