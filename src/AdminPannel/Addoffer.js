import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

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
        if (image && title && percent) {
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
                            discountPercentage: percent
                        }).then(() => {
                            toast.success('Offer added successfully!!!')
                        }).catch((err) => {
                            toast.error('Something went wrong')
                            console.log(err)
                        })
                    })
                })
        } else {
            toast.error('All fields required !!!')
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

                <ul className='add-offer-spec'>
                    <Link to='/admin/add/offer/' style={{ textDecoration: 'none' }}><li>For All User</li></Link>
                    <Link to='/admin/add/offer/forfirstuser' style={{ textDecoration: 'none' }}><li style={{ margin: '0 10px' }}>For First User</li></Link>
                    <Link to='/admin/add/offer/forcategory' style={{ textDecoration: 'none' }}><li>For category</li></Link>
                </ul>
                <h2>Add Custom Offer</h2>
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

export default Addoffer;