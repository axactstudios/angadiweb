import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'

const AddDish = () => {

    const [values, setValues] = useState({
        name: '',
        image: null,
        top: false,
        photo: '',
        photo1: '',
        photo2: '',
        iPrice: '',
        price: '',
        special: false,
        description: '',
        rating: '0',
        category: '',
        sCat: '',
        image1: '',
        image2: ''
    })
    const [cat, setCat] = useState([])

    const storage = firebase.storage()
    const store = firebase.firestore()

    useEffect(async () => {
        setCat([])
        await store.collection('Categories').get()
            .then(res => {
                res.forEach((doc) => {
                    setCat(cat => [...cat, doc.data()])
                })
            })
    }, [])

    const { name, image, top, photo, iPrice, price, photo1, photo2
        , special, description, rating, category, sCat, image1, image2 } = values

    const handleChange = name => (e) => {
        switch (name) {
            case 'image':
                const phooto = e.target.files[0];
                setValues({ ...values, photo: URL.createObjectURL(e.target.files[0]), image: phooto })
                break;
            case 'image1':
                setValues({ ...values, photo1: URL.createObjectURL(e.target.files[0]), image1: e.target.files[0] })
                break;
            case 'image2':
                setValues({ ...values, photo2: URL.createObjectURL(e.target.files[0]), image2: e.target.files[0] })
                break;
            default:
                setValues({ ...values, [name]: e.target.value })
                break;
        }
    };

    const handleSubmit = async () => {
        const uploadTask = storage.ref(`Dishes/${name}`).child(image.name).put(image);
        const uploadTask1 = storage.ref(`Dishes/${name}`).child(image1.name).put(image1);
        const uploadTask2 = storage.ref(`Dishes/${name}`).child(image2.name).put(image2);

        await uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
        },
            (error) => {
                toast.error('Something went wrong in uploading image !!')
            },
            () => {
                storage.ref(`Dishes/${name}`).child(image.name).getDownloadURL().then(async url1 => {
                    console.log(url1)
                    await uploadTask1.on('state_changed', (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log(progress)
                    },
                        (error) => {
                            toast.error('Something went wrong in uploading image !!')
                        },
                        () => {
                            storage.ref(`Dishes/${name}`).child(image1.name).getDownloadURL().then(async url2 => {
                                console.log(url2)
                                await uploadTask2.on('state_changed', (snapshot) => {
                                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                                    console.log(progress)
                                },
                                    (error) => {
                                        toast.error('Something went wrong in uploading image !!')
                                    },
                                    () => {
                                        storage.ref(`Dishes/${name}`).child(image2.name).getDownloadURL().then(async url3 => {
                                            await store.collection('Dishes').add({
                                                url: url1,
                                                url2: url2,
                                                url3: url3,
                                                name: name,
                                                top: top,
                                                special: special,
                                                rating: rating,
                                                iPrice: price,
                                                description: description,
                                                price: price,
                                                category: category,
                                                sCat: sCat
                                            }).then(() => {
                                                toast.success('Dish Added !!!')
                                                console.log('done')
                                            }).catch((err) => {
                                                console.log(err)
                                                toast.error('Something went wrong !!!')
                                            })
                                        })
                                    })
                            })
                        })
                })
            })
    }

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    return (
        <div>
            <ToastContainer />
            <div className='content1'>
                <h2>Add Dishes</h2>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter sCat Name" onChange={handleChange('sCat')} value={sCat} />
                    </Form.Group>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label >Choose First Images</Form.Label>
                                    <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image')} />
                                </Form.Group>
                                <div>
                                    <img src={photo} style={{ width: '110px' }} />
                                </div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label >Choose Second Images</Form.Label>
                                    <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image1')} />
                                </Form.Group>
                                <div>
                                    <img src={photo1} style={{ width: '110px' }} />
                                </div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label >Choose Third Images</Form.Label>
                                    <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image2')} />
                                </Form.Group>
                                <div>
                                    <img src={photo2} style={{ width: '110px' }} />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col>
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
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label>Choose Top</Form.Label><br />
                                    <select onChange={handleChange('top')} >
                                        <option>Please Select</option>
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group >
                                    <Form.Label>Choose special</Form.Label><br />
                                    <select onChange={handleChange('special')} >
                                        <option>Please Select</option>
                                        <option value={false}>No</option>
                                        <option value={true}>Yes</option>
                                    </select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Price" onChange={handleChange('price')} value={price} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="iPrice" onChange={handleChange('iPrice')} value={iPrice} />
                                </Form.Group>
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                    </Container>

                    <Form.Group>
                        <Form.Control type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                    </Form.Group>
                    <div>
                        <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger" onClick={handleSubmit}>
                            Create Dish
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddDish;


// const handleSubmit = async () => {
//     const uploadTask = storage.ref(`Dishes/${name}`).child(image.name).put(image);
//     await uploadTask.on('state_changed', (snapshot) => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         console.log(progress)
//     },
//         (error) => {
//             console.log(error)
//         },
//         () => {
//             storage.ref(`Dishes/${name}`).child(image.name).getDownloadURL().then(async url => {
//                 console.log(url)
//                 await store.collection('Dishes').add({
//                     url: url,
//                     name: name,
//                     top: top,
//                     special: special,
//                     rating: rating,
//                     iPrice: price,
//                     description: description,
//                     price: price,
//                     category: category,
//                     sCat: sCat
//                 }).then(() => {
//                     console.log('done')
//                 }).catch((err) => {
//                     console.log(err)
//                 })
//             })
//         })
// }
