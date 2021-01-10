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
    };

    const handleSubmit = async () => {
        var arr1 = []
        var arr2 = []
        var bn = false
        var bm = false
        var bv = false
        if(name){
            for(let i =0 ; i< name.length +1 ; i ++){
                arr1.push(name.slice(0, i))
            }
        }if(category){
            for(let y = 0 ; y < category.length + 1 ; y ++){
                arr2.push(category.slice(0,y))
            }
        }if(stock === 'false' ){
            bn = false
        }if(top === 'false'){
            bm = false
        }if(special === 'false'){
            bv = false
        }if(stock === 'true' ){
            bn = true
        }if(top === 'true'){
            bm = true
        }if(special === 'true'){
            bv = true
        }


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
                                                    top: bm,
                                                    special: bv,
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
                                                    stock: bn,
                                                    Quantity: quanArr,
                                                    categorySearch : arr2,
                                                    nameSearch : arr1
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
                <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Dish Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Dish Name" onChange={handleChange('name')} value={name} />
                </Form.Group>
                <Form.Group>
                <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Sub-category</Form.Label>
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
                                <Form.Control as="select" onChange={handleChange('category')}>
                                  <option>Please Select</option>
                                    {cat && cat.map((c, i) =>
                                    (<option key={i} value={c.catName}>
                                        {c.catName}
                                    </option>)
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Choose Top</Form.Label><br />
                                <Form.Control as="select" onChange={handleChange('top')}>
                                    <option>Please Select</option>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Choose special</Form.Label><br />
                                <Form.Control as="select" onChange={handleChange('special')}>
                                    <option>Please Select</option>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group >
                                <Form.Label>Choose Active</Form.Label><br />
                                <Form.Control as="select" onChange={handleChange('stock')}>
                                    <option>Please Select</option>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
                <Container fluid>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Selling price</Form.Label>
                                <Form.Control type="text" placeholder="Price" onChange={handleChange('price')} value={price} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter MRP</Form.Label>
                                <Form.Control type="text" placeholder="iPrice" onChange={handleChange('iPrice')} value={iPrice} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>

                <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter ProductID</Form.Label>
                    <Form.Control type="text" placeholder="Product Id" onChange={handleChange('productId')} value={productId} />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Description</Form.Label>
                    <Form.Control type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
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

                <br />

                <div>
                    <Container fluid>
                      <Form.Label style={{ fontWeight: "bold", margin: "1em 0 0.5em 0" }}>Enter Quantities</Form.Label>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity 1" onChange={handleChangee1('quantity')} value={quaan1.quantity} />
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
                                <Button id="button-1" onClick={() => handlesubmitt1("button-1")}>Add 1st Quantity</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity 2" onChange={handleChangee2('quantity')} value={quaan2.quantity} />
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
                                <Button id="button-2" onClick={() => handlesubmitt2("button-2")}>Add 2nd Quantity</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity 3" onChange={handleChangee3('quantity')} value={quaan3.quantity} />
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
                                <Button id="button-3" onClick={() => handlesubmitt3("button-3")}>Add 3rd Quantity</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Quantity 4" onChange={handleChangee4('quantity')} value={quaan4.quantity} />
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
                                <Button id="button-4" onClick={() => handlesubmitt4("button-4")}>Add 4th Quantity</Button>
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
