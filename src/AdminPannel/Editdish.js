import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/adminPanel.css'

const quanArr = []

const Editdish = () => {
    let match = useRouteMatch();

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
        image1: null,
        image2: null,
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

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const [cat, setCat] = useState([])
    const [dishh, setDishh] = useState([])

    const storage = firebase.storage()
    const store = firebase.firestore()
    const _id = match.params.dishname

    const { name, image, image1, image2, top, photo, iPrice, price
        , special, sCat, description, category, photo2, photo1, stock,
        productId, boughtTogether, boughtTogetherDiscount, boughtTogetherQuantity } = values

    useEffect(() => {
        store.collection('Dishes').doc(_id).get()
            .then(res => {
                setValues({
                    ...values, name: res.data().name, price: res.data().price, iPrice: res.data().iPrice, sCat: res.data().sCat,
                    description: res.data().description, photo: res.data().url, category: res.data().category,
                    special: res.data().special, top: res.data().top, photo1: res.data().url2, photo2: res.data().url3, stock: res.data().stock,
                    boughtTogetherDiscount: res.data().boughtTogetherDiscount, productId: res.data().productId, boughtTogether: res.data().boughtTogether,
                    boughtTogetherQuantity: res.data().boughtTogetherQuantity
                })
                if (res.data().Quantity && res.data().Quantity[0]) {
                    setQuaan1({
                        ...quaan1, productId: res.data().Quantity[0].productId, iPrice: res.data().Quantity[0].iPrice,
                        quantity: res.data().Quantity[0].quantity, price: res.data().Quantity[0].price
                    })
                }
                if (res.data().Quantity && res.data().Quantity[1]) {
                    setQuaan2({
                        ...quaan2, productId: res.data().Quantity[1].productId, iPrice: res.data().Quantity[1].iPrice,
                        quantity: res.data().Quantity[1].quantity, price: res.data().Quantity[1].price
                    })
                }
                if (res.data().Quantity && res.data().Quantity[2]) {
                    setQuaan3({
                        ...quaan3, productId: res.data().Quantity[2].productId, iPrice: res.data().Quantity[2].iPrice,
                        quantity: res.data().Quantity[2].quantity, price: res.data().Quantity[2].price
                    })
                }
                if (res.data().Quantity && res.data().Quantity[3]) {
                    setQuaan4({
                        ...quaan4, productId: res.data().Quantity[3].productId, iPrice: res.data().Quantity[3].iPrice,
                        quantity: res.data().Quantity[3].quantity, price: res.data().Quantity[3].price
                    })
                }
            })
        setCat([])
        store.collection('Categories').get()
            .then(res => {
                setCat([])
                res.forEach((doc) => {
                    setCat(cat => [...cat, doc.data()])
                })
            })
        setDishh([])
        store.collection('Dishes').get()
            .then(res => {
                res.forEach((doc) => {
                    setDishh(cat => [...cat, { data: doc.data(), _id: doc.id }])
                })
            })
    }, [])

    const delCat = () => {
        store.collection("Dishes").doc(_id).delete().then(function () {
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

    const handleSubmit = () => {

        var arr1 = []
        var arr2 = []
        var bn = stock
        var bm = top
        var bv = special
        if (name) {
            for (let i = 0; i < name.length + 1; i++) {
                arr1.push(name.slice(0, i))
            }
        } if (category) {
            for (let y = 0; y < category.length + 1; y++) {
                arr2.push(category.slice(0, y))
            }
        } if (stock === 'false') {
            bn = false
        } if (top === 'false') {
            bm = false
        } if (special === 'false') {
            bv = false
        } if (stock === 'true') {
            bn = true
        } if (top === 'true') {
            bm = true
        } if (special === 'true') {
            bv = true
        }


        if (image !== null) {
            const uploadTask = storage.ref(`Dishes/${name}`).child(image.name).put(image);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
                (error) => {
                    console.log(error)
                    toast.error('Something went wrong in uploading image !!')
                },
                () => {
                    storage.ref(`Dishes/${name}`).child(image.name).getDownloadURL().then(async url => {
                        console.log(url)
                        await store.collection('Dishes').doc(_id).update({
                            url: url,
                            name: name,
                            top: bm,
                            special: bv,
                            iPrice: price,
                            description: description,
                            price: price,
                            category: category,
                            sCat: sCat,
                            stock: bn,
                            boughtTogether: boughtTogether,
                            boughtTogetherDiscount: boughtTogetherDiscount,
                            boughtTogetherQuantity: boughtTogetherQuantity,
                            productId: productId,
                            Quantity: quanArr,
                            categorySearch: arr2,
                            nameSearch: arr1
                        }).then(() => {
                            console.log('fuck offf')
                            toast.success('Dish edit successfully !!!')
                        }).catch((err) => {
                            console.log(err)
                            toast.error('Something went wrong !!!')
                        })
                    })
                })
        } else {
            if (image1 !== null) {
                const uploadTask1 = storage.ref(`Dishes/${name}`).child(image1.name).put(image1);
                uploadTask1.on('state_changed', (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(progress)
                },
                    (error) => {
                        console.log(error)
                        toast.error('Something went wrong in uploading image !!')
                    },
                    () => {
                        storage.ref(`Dishes/${name}`).child(image1.name).getDownloadURL().then(async url => {
                            console.log(url)
                            await store.collection('Dishes').doc(_id).update({
                                url2: url,
                                name: name,
                                top: bm,
                                special: bv,
                                iPrice: price,
                                description: description,
                                price: price,
                                category: category,
                                sCat: sCat,
                                stock: bn,
                                boughtTogether: boughtTogether,
                                boughtTogetherDiscount: boughtTogetherDiscount,
                                boughtTogetherQuantity: boughtTogetherQuantity,
                                productId: productId,
                                Quantity: quanArr,
                                categorySearch: arr2,
                                nameSearch: arr1
                            }).then(() => {
                                console.log('fuck offf')
                                toast.success('Dish edit successfully !!!')
                            }).catch((err) => {
                                console.log(err)
                                toast.error('Something went wrong !!!')
                            })
                        })
                    })
            } else {
                if (image2 !== null) {
                    const uploadTask2 = storage.ref(`Dishes/${name}`).child(image2.name).put(image2);
                    uploadTask2.on('state_changed', (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        console.log(progress)
                    },
                        (error) => {
                            console.log(error)
                            toast.error('Something went wrong in uploading image !!')
                        },
                        () => {
                            storage.ref(`Dishes/${name}`).child(image2.name).getDownloadURL().then(async url => {
                                console.log(url)
                                await store.collection('Dishes').doc(_id).update({
                                    url3: url,
                                    name: name,
                                    top: bm,
                                    special: bv,
                                    iPrice: price,
                                    description: description,
                                    price: price,
                                    category: category,
                                    sCat: sCat,
                                    stock: bn,
                                    boughtTogether: boughtTogether,
                                    boughtTogetherDiscount: boughtTogetherDiscount,
                                    boughtTogetherQuantity: boughtTogetherQuantity,
                                    productId: productId,
                                    Quantity: quanArr,
                                    categorySearch: arr2,
                                    nameSearch: arr1
                                }).then(() => {
                                    console.log('fuck offf')
                                    toast.success('Dish edit successfully !!!')
                                }).catch((err) => {
                                    console.log(err)
                                    toast.error('Something went wrong !!!')
                                })
                            })
                        })
                } else {
                    store.collection('Dishes').doc(_id).update({
                        name: name,
                        top: bm,
                        special: bv,
                        iPrice: price,
                        description: description,
                        price: price,
                        category: category,
                        sCat: sCat,
                        stock: bn,
                        boughtTogether: boughtTogether,
                        boughtTogetherDiscount: boughtTogetherDiscount,
                        boughtTogetherQuantity: boughtTogetherQuantity,
                        productId: productId,
                        Quantity: quanArr,
                        categorySearch: arr2,
                        nameSearch: arr1
                    }).then(() => {
                        console.log('fuck offf')
                        toast.success('Dish Update successfully')
                    }).catch((err) => {
                        console.log(err)
                        toast.error('Something went wrong !!!')
                    })
                }
            }
        }
    }



    const handleChangee1 = name => (e) => {
        e.preventDefault()
        setQuaan1({ ...quaan1, [name]: e.target.value })
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

    const handlesubmitt1 = (id) => {
        if (quaan1.productId && quaan1.iPrice && quaan1.price && quaan1.quantity) {
            quanArr.push(quaan1)
            document.getElementById(id).setAttribute("disabled", true);
        } else {
            toast.error('Please fill all field in quantity 1')
        }
    }
    const handlesubmitt2 = (id) => {
        if (quaan2.productId && quaan2.iPrice && quaan2.price && quaan2.quantity) {
            quanArr.push(quaan2)
            document.getElementById(id).setAttribute("disabled", true);
        } else {
            toast.error('Please fill all field in quantity 2')
        }
    }
    const handlesubmitt3 = (id) => {
        if (quaan3.productId && quaan3.iPrice && quaan3.price && quaan3.quantity) {
            quanArr.push(quaan3)
            document.getElementById(id).setAttribute("disabled", true);
        } else {
            toast.error('Please fill all field in quantity 3')
        }
    }
    const handlesubmitt4 = (id) => {
        if (quaan4.productId && quaan4.iPrice && quaan4.price && quaan4.quantity) {
            quanArr.push(quaan4)
            document.getElementById(id).setAttribute("disabled", true);
        } else {
            toast.error('Please fill all field in quantity 4')
        }
    }


    return (
        <div>
            <ToastContainer />

            <div className='content1'>
                <h2 style={{ fontWeight: "bold", margin: "0.5em 0" }}>Edit Dishes</h2>
                <Form className="edit-dish-form">
                    <Form.Group className="edit-dish-form-input">
                        <Form.Label style={{ fontWeight: "bold", margin: "0 0 0.5em 0" }}>Item</Form.Label>
                        <Form.Control type="text" placeholder="Item" onChange={handleChange('name')} value={name} />

                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" onChange={handleChange('sCat')} value={sCat} />

                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Default Price</Form.Label>
                        <Form.Control type="text" placeholder="iPrice" onChange={handleChange('iPrice')} value={iPrice} />

                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Selling Price</Form.Label>
                        <Form.Control type="text" placeholder="Price" onChange={handleChange('price')} value={price} />

                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Choose category</Form.Label><br />
                        {category} &nbsp;
                        <select onChange={handleChange('category')} >
                            <option>Please Select</option>
                            {cat && cat.map((c, i) =>
                            (<option key={i} value={c.catName}>
                                {c.catName}
                            </option>)
                            )}
                        </select>< br />
                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Choose Top </Form.Label><br />
                        {JSON.stringify(top)} &nbsp;
                        <select onChange={handleChange('top')} >
                            <option>Please Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>< br />
                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Choose special </Form.Label><br />
                        {JSON.stringify(special)} &nbsp;
                        <select onChange={handleChange('special')} >
                            <option>Please Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select><br />
                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Availability </Form.Label><br />
                        {JSON.stringify(stock)} &nbsp;
                        <select onChange={handleChange('stock')} >
                            <option>Please Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select><br />

                        <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Edit Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                    </Form.Group>
                    <Form.Group className="edit-dish-form-input">
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input onChange={handleChange('image')} accept='image/*' isValid />
                            <Form.File.Label data-browse="Choose Image">Image #1</Form.File.Label>
                        </Form.File>
                        <img src={photo} />
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input onChange={handleChange('image1')} accept='image/*' isValid />
                            <Form.File.Label data-browse="Choose Image">Image #2</Form.File.Label>
                        </Form.File>
                        <img src={photo1} />
                        <Form.File id="formcheck-api-custom" custom>
                            <Form.File.Input onChange={handleChange('image2')} accept='image/*' isValid />
                            <Form.File.Label data-browse="Choose Image">Image #3</Form.File.Label>
                        </Form.File>
                        <img src={photo2} />
                    </Form.Group>
                </Form>

                <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter ProductID</Form.Label>
                    <Form.Control type="text" placeholder="Product Id" onChange={handleChange('productId')} value={productId} />
                </Form.Group>

                <div>
                    <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Bought Together Discount</Form.Label>
                        <Form.Control type="text" placeholder="Enter Bought Together Discount" onChange={handleChange('boughtTogetherDiscount')} value={boughtTogetherDiscount} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Bought Together Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Enter Bought Together Quantityy" onChange={handleChange('boughtTogetherQuantity')} value={boughtTogetherQuantity} />
                    </Form.Group>
                    <Form.Group >
                      <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Choose Bought Tohether Product</Form.Label>
                      <Form.Control as="select" onChange={handleChange('boughtTogether')}>
                        {dishh && dishh.map((c, i) =>
                            (<option key={i} value={c._id}>
                                {c.data.name}
                            </option>)
                        )}
                      </Form.Control>
                    </Form.Group>
                </div>



                <div>
                    <Container fluid>
                      <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Quantities</Form.Label>
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
                              <Button id="button-a" onClick={() => handlesubmitt1("button-a")}>Add 1st Quantity</Button>
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
                              <Button id="button-b" onClick={() => handlesubmitt2("button-b")}>Add 2nd Quantity</Button>
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
                              <Button id="button-c" onClick={() => handlesubmitt3("button-c")}>Add 3rd Quantity</Button>
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
                              <Button id="button-d" onClick={() => handlesubmitt4("button-d")}>Add 4th Quantity</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>



                <div className="edit-button-group">
                    <button onClick={handleSubmit}>Edit</button>
                    <button id="edit-delete-button" onClick={delCat}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Editdish;