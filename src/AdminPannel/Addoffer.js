import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'

const Addoffer = () => {

    const [values, setValues] = useState({
        title: '',
        image: null,
        photo: '',
        subtitle: '',
        percent: ''
    })

    const storage = firebase.storage()
    const store = firebase.firestore()

    const { title, image, subtitle, photo, percent } = values

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
        const uploadTask = storage.ref(`Offer/${image.name}`).put(image);
        await uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
        },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref('Offer').child(image.name).getDownloadURL().then(async url => {
                    console.log(url)
                    await store.collection('Offers').add({
                        ImageURL: url,
                        Title: title,
                        Subtitle: subtitle,
                        discountPercentage: percent
                    }).then(() => {
                        toast.success('Offer added successfully!!!')
                    }).catch((err) => {
                        toast.error('Something went wrong')
                        console.log(err)
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
                <h2>Add Offer</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Add Title </Form.Label><br />
                        <Form.Control type="text" placeholder="Title" onChange={handleChange('title')} value={title} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Choose Images</Form.Label>
                        <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image')} />
                    </Form.Group>
                    <div>
                        <img src={photo} style={{ height: '110px', width: '110px' }} />
                    </div>
                    <Form.Group >
                        <Form.Label>Add subtitle </Form.Label><br />
                        <Form.Control type="text" placeholder="SubTitle" onChange={handleChange('subtitle')} value={subtitle} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Add Percent off </Form.Label><br />
                        <Form.Control type="text" placeholder="Percent Off" onChange={handleChange('percent')} value={percent} />
                    </Form.Group>
                    <div>
                        <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger" onClick={handleSubmit}>
                            Create Offer
                    </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Addoffer;