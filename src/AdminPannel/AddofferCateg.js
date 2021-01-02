import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { isAuth } from '../helpers/auth'

const AddofferCateg = () => {

    const [values, setValues] = useState({
        title: '',
        image: null,
        photo: '',
        subtitle: '',
        percent: '',
        category: ''
    })
    const [categ, setCateg] = useState([])
    const storage = firebase.storage()
    const store = firebase.firestore()

    const { title, image, subtitle, photo, percent, category } = values

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
                toast.error('Something went wrong in uploading image !!')
                console.log(error)
            },
            () => {
                storage.ref('Offer').child(image.name).getDownloadURL().then(async url => {
                    console.log(url)
                    await store.collection('Offers').add({
                        ImageURL: url,
                        Title: title,
                        Subtitle: subtitle,
                        discountPercentage: percent,
                        categorySpecific: category
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
        setCateg([])
        store.collection('Categories').get()
            .then((res) => {
                res.forEach((non) => {
                    setCateg((dd) => [...dd, { data: non.data(), _id: non.id }])
                })
            })
    }, [])

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })

    }, [])


    return (
        <div>
            <ToastContainer />
            <div className="admin-panel-header">
                <h5>Angadi.ae</h5>
                <h2>Admin Panel</h2>
                <button><i class="fa fa-power-off" /> Logout</button>
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

                <ul className='add-offer-spec'>
                    <Link to='/add/offer/' style={{ textDecoration: 'none' }}><li>For All User</li></Link>
                    <Link to='/add/offer/forfirstuser' style={{ textDecoration: 'none' }}><li style={{ margin: '0 10px' }}>For First User</li></Link>
                    <Link to='/add/offer/forcategory' style={{ textDecoration: 'none' }}><li>For category</li></Link>
                </ul>

                <h2>Add Offer For Specific Category</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Add Title </Form.Label><br />
                        <Form.Control type="text" placeholder="Title" onChange={handleChange('title')} value={title} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Choose category</Form.Label><br />
                        <select onChange={handleChange('category')} >
                            <option>Please Select</option>
                            {categ && categ.map((c, i) =>
                            (<option key={i} value={c.data.catName}>
                                {c.data.catName}
                            </option>)
                            )}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Choose Images</Form.Label>
                        <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image')} />
                    </Form.Group>
                    <div>
                        <img src={photo} style={{ width: '110px' }} />
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

export default AddofferCateg;