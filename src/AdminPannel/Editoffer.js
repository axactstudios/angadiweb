import React, { useEffect, useState } from 'react';
import {  useRouteMatch } from 'react-router-dom'
import * as firebase from 'firebase'
import { Form } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

const Editoffer = () => {
    let match = useRouteMatch();

    const [values, setValues] = useState({
        title: '',
        image: null,
        photo: '',
        subtitle: '',
        percent: ''
    })

    const storage = firebase.storage()
    const store = firebase.firestore()
    const _id = match.params.offerId
    const { title, image, subtitle, photo, percent } = values

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    useEffect(() => {
        store.collection('Offers').doc(_id).get()
            .then(res => {
                const me = res.data()
                setValues({
                    ...values, title: me.Title, photo: me.ImageURL,
                    subtitle: me.Subtitle, percent: me.discountPercentage
                })
            })
    }, [])

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

    const handlesubmit = () => {
        if (image === null) {
            store.collection('Offers').doc(_id).update({
                Title: title,
                Subtitle: subtitle,
                discountPercentage: percent
            }).then(() => {
                console.log('done')
                toast.success('Offer Card Edit Successfully !!!')
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong !!!')
            })
        } else {
            const uploadTask = storage.ref(`Offer/${image.name}`).put(image);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
                (error) => {
                    console.log(error)
                    toast.error('Something went wrong in uploading image !!')
                },
                () => {
                    storage.ref('Offer').child(image.name).getDownloadURL().then(async url => {
                        console.log(url)
                        store.collection('Offers').doc(_id).update({
                            ImageURL: url,
                            Title: title,
                            Subtitle: subtitle,
                            discountPercentage: percent
                        }).then(() => {
                            toast.success('Offer Card Edit Successfully !!!')
                        }).catch((err) => {
                            console.log(err)
                            toast.error('Something went wrong !!!')
                        })
                    })
                })
        }
    }

    return (

        <div>
            <ToastContainer />

            <div className='content1'>
                <h2>Edit Offer</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Add Title </Form.Label><br />
                        <Form.Control type="text" placeholder="Title" onChange={handleChange('title')} value={title} />

                        <Form.Label>Add subtitle </Form.Label><br />
                        <Form.Control type="text" placeholder="SubTitle" onChange={handleChange('subtitle')} value={subtitle} />

                        <Form.Label>Add Percent off </Form.Label><br />
                        <Form.Control type="text" placeholder="Percent Off" onChange={handleChange('percent')} value={percent} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Choose Images</Form.Label>
                        <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image')} />
                        <img src={photo} style={{ width: '110px' }} />
                    </Form.Group>
                </Form>
                <div className="edit-button-group">
                    <button onClick={handlesubmit}>Edit</button>
                </div>
            </div>
        </div>
    );
};

export default Editoffer;