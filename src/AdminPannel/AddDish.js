import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'


const quanArr = []

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
        image2: '',
        boughtTogetherDiscount: '',
        boughtTogetherQuantity: '',
        boughtTogether: '',
        stock: '',
        productId: ''
    })
    const [quaan1, setQuaan1] = useState({
        quantity: '',
        productId: '',
        iPrice: '',
        price: ''
    })
    const [quaan2, setQuaan2] = useState({
        quantity: '',
        productId: '',
        iPrice: '',
        price: ''
    })
    const [quaan3, setQuaan3] = useState({
        quantity: '',
        productId: '',
        iPrice: '',
        price: ''
    })
    const [quaan4, setQuaan4] = useState({
        quantity: '',
        productId: '',
        iPrice: '',
        price: ''
    })
    const [cat, setCat] = useState([])
    const [dishh, setDishh] = useState([])

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
        setDishh([])
        await store.collection('Dishes').get()
            .then(res => {
                res.forEach((doc) => {
                    setDishh(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    const { name, image, top, photo, iPrice, price, photo1, photo2,
        special, description, rating, category, sCat, image1, image2,
        boughtTogether, boughtTogetherDiscount, boughtTogetherQuantity, stock,
        productId } = values

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
        console.log(values)
    };

    const handleSubmit = async () => {
        if (image && image1 && image2 && name && price && iPrice && productId && category && sCat && description) {
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
                                                    sCat: sCat,
                                                    boughtTogether: boughtTogether,
                                                    boughtTogetherDiscount: boughtTogetherDiscount,
                                                    boughtTogetherQuantity: boughtTogetherQuantity,
                                                    productId: productId,
                                                    stock: stock,
                                                    Quantity: quanArr
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
        } else {
            toast.error('Please Fill All enteries !!!')
        }
    }

    const handleChangee1 = name => (e) => {
        e.preventDefault()
        setQuaan1({ ...quaan1, [name]: e.target.value })
        console.log(quaan1)
    }
    const handleChangee2 = name => (e) => {
        e.preventDefault()
        setQuaan2({ ...quaan2, [name]: e.target.value })
    }
    const handleChangee3 = name => (e) => {
        e.preventDefault()
        setQuaan3({ ...quaan3, [name]: e.target.value })
    }
    const handleChangee4 = name => (e) => {
        e.preventDefault()
        setQuaan4({ ...quaan4, [name]: e.target.value })
    }

    const handlesubmitt1 = () => {
        if (quaan1.productId && quaan1.iPrice && quaan1.price && quaan1.quantity) {
            quanArr.push(quaan1)
        } else {
            toast.error('Please fill all field in quantity 1')
        }
    }
    const handlesubmitt2 = () => {
        if (quaan2.productId && quaan2.iPrice && quaan2.price && quaan2.quantity) {
            quanArr.push(quaan2)
        } else {
            toast.error('Please fill all field in quantity 2')
        }
    }
    const handlesubmitt3 = () => {
        if (quaan3.productId && quaan3.iPrice && quaan3.price && quaan3.quantity) {
            quanArr.push(quaan3)
        } else {
            toast.error('Please fill all field in quantity 3')
        }
    }
    const handlesubmitt4 = () => {
        if (quaan4.productId && quaan4.iPrice && quaan4.price && quaan4.quantity) {
            quanArr.push(quaan4)
        } else {
            toast.error('Please fill all field in quantity 4')
        }
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
                        <Col>
                            <Form.Group >
                                <Form.Label>Choose Active</Form.Label><br />
                                <select onChange={handleChange('stock')} >
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
                    <Form.Control type="text" placeholder="Product Id" onChange={handleChange('productId')} value={productId} />
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                </Form.Group>

                <div style={{ 'border': '1px solid black' }}>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter boughtTogetherDiscount" onChange={handleChange('boughtTogetherDiscount')} value={boughtTogetherDiscount} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Enter boughtTogetherQuantity" onChange={handleChange('boughtTogetherQuantity')} value={boughtTogetherQuantity} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Choose Bought Together Product</Form.Label><br />
                        <select onChange={handleChange('boughtTogether')} >
                            <option>Please Select</option>
                            {dishh && dishh.map((c, i) =>
                            (<option key={i} value={c._id}>
                                {c.data.name}
                            </option>)
                            )}
                        </select>
                    </Form.Group>
                </div>

                <br />

                <div style={{ 'border': '1px solid black' }}>
                    <Container fluid>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity" onChange={handleChangee1('quantity')} value={quaan1.quantity} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter price" onChange={handleChangee1('price')} value={quaan1.price} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter iPrice" onChange={handleChangee1('iPrice')} value={quaan1.iPrice} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter productId" onChange={handleChangee1('productId')} value={quaan1.productId} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <button onClick={handlesubmitt1}>Add 1st Quantity</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity" onChange={handleChangee2('quantity')} value={quaan2.quantity} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter price" onChange={handleChangee2('price')} value={quaan2.price} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter iPrice" onChange={handleChangee2('iPrice')} value={quaan2.iPrice} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter productId" onChange={handleChangee2('productId')} value={quaan2.productId} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <button onClick={handlesubmitt2}>Add 2nd Quantity</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity" onChange={handleChangee3('quantity')} value={quaan3.quantity} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter price" onChange={handleChangee3('price')} value={quaan3.price} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter iPrice" onChange={handleChangee3('iPrice')} value={quaan3.iPrice} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter productId" onChange={handleChangee3('productId')} value={quaan3.productId} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <button onClick={handlesubmitt3}>Add 3rd Quantity</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity" onChange={handleChangee4('quantity')} value={quaan4.quantity} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter price" onChange={handleChangee4('price')} value={quaan4.price} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter iPrice" onChange={handleChangee4('iPrice')} value={quaan4.iPrice} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter productId" onChange={handleChangee4('productId')} value={quaan4.productId} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <button onClick={handlesubmitt4}>Add 4th Quantity</button>
                            </Col>
                        </Row>
                    </Container>
                </div>


                <div>
                    <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger" onClick={handleSubmit}>
                        Create Dish
                    </Button>
                </div>

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
