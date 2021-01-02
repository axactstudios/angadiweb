import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/adminPanel.css'

const Editdish = ({ match }) => {

    const [values, setValues] = useState({
        name: '',
        image: null,
        image1: null,
        image2: null,
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
        stock: false
    })
    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })
    const [cat, setCat] = useState([])
    const storage = firebase.storage()
    const store = firebase.firestore()
    const _id = match.params.dishname

    const { name, image, image1, image2, top, photo, iPrice, price
        , special, sCat, description, category, photo2, photo1, stock } = values

    useEffect(() => {
        store.collection('Dishes').doc(_id).get()
            .then(res => {
                setValues({
                    ...values, name: res.data().name, price: res.data().price, iPrice: res.data().iPrice, sCat: res.data().sCat,
                    description: res.data().description, photo: res.data().url, category: res.data().category,
                    special: res.data().special, top: res.data().top, photo1: res.data().url2, photo2: res.data().url3, stock: res.data().stock
                })
            })

        store.collection('Categories').get()
            .then(res => {
                setCat([])
                res.forEach((doc) => {
                    setCat(cat => [...cat, doc.data()])
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
                            top: top,
                            special: special,
                            iPrice: price,
                            description: description,
                            price: price,
                            category: category,
                            sCat: sCat,
                            stock: stock
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
                                top: top,
                                special: special,
                                iPrice: price,
                                description: description,
                                price: price,
                                category: category,
                                sCat: sCat,
                                stock: stock
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
                                    top: top,
                                    special: special,
                                    iPrice: price,
                                    description: description,
                                    price: price,
                                    category: category,
                                    sCat: sCat,
                                    stock: stock
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
                        top: top,
                        special: special,
                        iPrice: price,
                        description: description,
                        price: price,
                        category: category,
                        sCat: sCat,
                        stock: stock
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

    return (
        <div>
            <ToastContainer />
            <div className="admin-panel-header">
              <h5>Angadi.ae</h5>
              <h2>Admin Panel</h2>
              <button><i class="fa fa-power-off"/>  Logout</button>
            </div>
            <div class="mobile_nav">
                <div class="nav_bar">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="mobile_profile_image" alt="" />
                    <i class="fa fa-bars nav_btn"></i>
                </div>
                <div class="mobile_nav_items">
                    <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                    <Link className="admin1" to='/get/orders'><i class="fa fa-cutlery"></i>orders</Link>
                    <Link className="admin1" to='/get/dishes'><i class="fa fa-glass"></i>dishes</Link>
                    <Link className="admin1" to='/get/category'><i class="fa fa-coffee"></i>category</Link>
                    <Link className="admin1" to='/get/offers'><i class="fa fa-tag"></i>Offers</Link>
                    <Link className="admin1" to='/get/users'><i class="fa fa-user"></i>Users</Link>
                    <Link className="admin1" to='/get/area'><i class="fa fa-user"></i>Emirates</Link>
                    <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                    <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                    <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
                    <Link className="admin1" to='/add/emirates'><i class="fa fa-plus-square"></i>add Emirates</Link>
                    <Link className="admin1" to='/add/area'><i class="fa fa-plus-square"></i>add Emiratesarea</Link>
                </div>
            </div>
            <div class="sidebar">
                <div class="profile_info">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="profile_image" alt="" />
                    <h4>{isAuth().Name}</h4>
                </div>
                <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                <Link className="admin1" to='/get/orders'><i class="fa fa-cutlery"></i>orders</Link>
                <Link className="admin1" to='/get/dishes'><i class="fa fa-glass"></i>dishes</Link>
                <Link className="admin1" to='/get/category'><i class="fa fa-coffee"></i>category</Link>
                <Link className="admin1" to='/get/offers'><i class="fa fa-tag"></i>Offers</Link>
                <Link className="admin1" to='/get/users'><i class="fa fa-user"></i>Users</Link>
                <Link className="admin1" to='/get/area'><i class="fa fa-user"></i>Emirates</Link>
                <Link className="admin1" to='/create/category'><i class="fa fa-plus-square"></i>add category</Link>
                <Link className="admin1" to='/add/dish'><i class="fa fa-plus-square"></i>add dish</Link>
                <Link className="admin1" to='/add/offer'><i class="fa fa-plus-square"></i>add offer</Link>
                <Link className="admin1" to='/add/emirates'><i class="fa fa-plus-square"></i>add Emirates</Link>
                <Link className="admin1" to='/add/area'><i class="fa fa-plus-square"></i>add Emiratesarea</Link>
            </div>


            <div className='content1'>
                <h2 style={{fontWeight: "bold", margin: "0.5em 0"}}>Edit Dishes</h2>
                <Form className="edit-dish-form">
                    <Form.Group className="edit-dish-form-input">
                        <Form.Label style={{fontWeight: "bold", margin: "0 0 0.5em 0"}}>Item</Form.Label>
                        <Form.Control type="text" placeholder="Item" onChange={handleChange('name')} value={name} />
                        
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Category</Form.Label>
                        <Form.Control type="text" placeholder="Category" onChange={handleChange('sCat')} value={sCat} />
                        
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Default Price</Form.Label>
                        <Form.Control type="text" placeholder="iPrice" onChange={handleChange('iPrice')} value={iPrice} />
                        
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Selling Price</Form.Label>
                        <Form.Control type="text" placeholder="Price" onChange={handleChange('price')} value={price} />

                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Choose category</Form.Label><br />
                        {category} &nbsp;
                        <select onChange={handleChange('category')} >
                            <option>Please Select</option>
                            {cat && cat.map((c, i) =>
                                (<option key={i} value={c.catName}>
                                    {c.catName}
                                </option>)
                            )}
                        </select>< br />
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Choose Top </Form.Label><br />
                        {JSON.stringify(top)} &nbsp;
                        <select onChange={handleChange('top')} >
                            <option>Please Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select>< br />
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Choose special </Form.Label><br />
                        {JSON.stringify(special)} &nbsp;
                        <select onChange={handleChange('special')} >
                            <option>Please Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select><br />
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Availability </Form.Label><br />
                        {JSON.stringify(stock)} &nbsp;
                        <select onChange={handleChange('stock')} >
                            <option>Please Select</option>
                            <option value={false}>No</option>
                            <option value={true}>Yes</option>
                        </select><br />

                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Edit Description</Form.Label>
                        <Form.Control type="text" placeholder="Description" onChange={handleChange('description')} value={description} />
                    </Form.Group>
                    <Form.Group className="edit-dish-form-input">
                        <Form.File id="formcheck-api-custom" custom>
                          <Form.File.Input onChange={handleChange('image')} accept='image/*' isValid />
                          <Form.File.Label data-browse="Choose Image">Image #1</Form.File.Label>
                        </Form.File>
                        <img src={photo}/>
                        <Form.File id="formcheck-api-custom" custom>
                          <Form.File.Input onChange={handleChange('image1')} accept='image/*' isValid />
                          <Form.File.Label data-browse="Choose Image">Image #2</Form.File.Label>
                        </Form.File>
                        <img src={photo1}/>
                        <Form.File id="formcheck-api-custom" custom>
                          <Form.File.Input onChange={handleChange('image2')} accept='image/*' isValid />
                          <Form.File.Label data-browse="Choose Image">Image #3</Form.File.Label>
                        </Form.File>
                        <img src={photo2}/>
                    </Form.Group>
                </Form>
                <div className="edit-button-group">
                  <button onClick={handleSubmit}>Edit</button>
                  <button id="edit-delete-button" onClick={delCat}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Editdish;