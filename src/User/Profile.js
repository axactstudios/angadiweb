import React, { useState, Fragment, useEffect } from 'react';
import { isAuth } from '../helpers/auth';
import { Form, Button } from 'react-bootstrap'
import * as firebase from 'firebase'
import { toast, ToastContainer } from 'react-toastify'

const Profile = () => {

    const [values, setValues] = useState({
        name: '',
        error: '',
        email: '',
        purl: null,
        success: false,
        photo: ''
    })
    const [_id, setId] = useState('')

    const { name, email, purl, photo } = values

    const userId = isAuth().id;
    const db = firebase.firestore()
    const storage = firebase.storage()

    useEffect(() => {
        db.collection('Users').where("id", "==", `${userId}`).get()
            .then(res => {
                res.forEach((doc) => {
                    const me = doc.data()
                    setId(doc.id)
                    setValues({
                        ...values, name: me.Name, photo: me.pUrl,
                        email: me.mail
                    })
                })
            })
    }, [])

    const handleChange = name => (e) => {
        switch (name) {
            case 'purl':
                const phooto = e.target.files[0];
                setValues({ ...values, photo: URL.createObjectURL(e.target.files[0]), purl: phooto })
                break;
            default:
                setValues({ ...values, [name]: e.target.value })
                break;
        }
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        if (purl === null) {
            db.collection('Users').doc(_id).update({
                Name: name
            }).then(() => {
                toast.success('User Edit successfully !!!')
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong !!!')
            })
        } else {
            const uploadTask = storage.ref(`Users/${purl.name}`).put(purl);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
                (error) => {
                    console.log(error)
                    toast.error('Something went wrong in uploading image !!')
                },
                () => {
                    storage.ref('Users').child(purl.name).getDownloadURL().then(async url => {
                        console.log(url)
                        db.collection('Users').doc(_id).update({
                            pUrl: url,
                            Name: name,
                        }).then(() => {
                            toast.success('Category Edit successfully !!!')
                        }).catch((err) => {
                            console.log(err)
                            toast.error('Something went wrong !!!')
                        })
                    })
                })
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="login">
                <h2>Update Profile.</h2>
            </div>
            <Form onSubmit={clickSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" onChange={handleChange('name')} value={name} placeholder="Enter Name" />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={email} placeholder="Ener Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Label >Choose Images</Form.Label>
                    <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('purl')} />
                </Form.Group>
                <div>
                    <img src={photo} style={{ height: '110px', width: '110px' }} />
                </div>
                <Button className="login25" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment >
    );
}

export default Profile;