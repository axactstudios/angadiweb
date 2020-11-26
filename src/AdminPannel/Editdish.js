import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'

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
    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
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

            <div class="mobile_nav">
                <div class="nav_bar">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="mobile_profile_image" alt="" />
                    <i class="fa fa-bars nav_btn"></i>
                </div>
                <div class="mobile_nav_items">
                    <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                    <Link className="admin1" to='/get/orders'><i class="fa fa-desktop"></i>orders</Link>
                    <Link className="admin1" to='/get/dishes'><i class="fa fa-desktop"></i>dishes</Link>
                    <Link className="admin1" to='/get/category'><i class="fa fa-desktop"></i>category</Link>
                    <Link className="admin1" to='/get/offers'><i class="fa fa-desktop"></i>Offers</Link>
                    <Link className="admin1" to='/get/users'><i class="fa fa-desktop"></i>Users</Link>
                    <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>add category</Link>
                    <Link className="admin1" to='/add/dish'><i class="fa fa-desktop"></i>add dish</Link>
                    <Link className="admin1" to='/add/offer'><i class="fa fa-desktop"></i>add offer</Link>
                </div>
            </div>

            <div class="sidebar">
                <div class="profile_info">
                    <img src={`https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg`} class="profile_image" alt="" />
                    <h4>{isAuth().Name}</h4>
                </div>
                <Link className="admin1" to='/admin/dashboard'><i class="fa fa-desktop"></i>Dashboard</Link>
                <Link className="admin1" to='/get/orders'><i class="fa fa-desktop"></i>orders</Link>
                <Link className="admin1" to='/get/dishes'><i class="fa fa-desktop"></i>dishes</Link>
                <Link className="admin1" to='/get/category'><i class="fa fa-desktop"></i>category</Link>
                <Link className="admin1" to='/get/offers'><i class="fa fa-desktop"></i>Offers</Link>
                <Link className="admin1" to='/get/users'><i class="fa fa-desktop"></i>Users</Link>
                <Link className="admin1" to='/create/category'><i class="fa fa-desktop"></i>add category</Link>
                <Link className="admin1" to='/add/dish'><i class="fa fa-desktop"></i>add dish</Link>
                <Link className="admin1" to='/add/offer'><i class="fa fa-desktop"></i>add offer</Link>
            </div>

            <div className='content1'>
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
        </div>
    );
};

export default Editdish;