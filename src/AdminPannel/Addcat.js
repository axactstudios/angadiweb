import React, { useState } from 'react';
import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'

const Addcat = () => {

    const [values, setValues] = useState({
        name: '',
        image: null,
        top: false,
        photo: ''
    })

    const storage = firebase.storage()
    const store = firebase.firestore()

    const { name, image, top, photo } = values

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
        const uploadTask = storage.ref(`category/${image.name}`).put(image);
        await uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(progress)
        },
            (error) => {
                console.log(error)
            },
            () => {
                storage.ref('category').child(image.name).getDownloadURL().then(async url => {
                    console.log(url)
                    await store.collection('Categories').add({
                        imageURL: url,
                        catName: name,
                        top: top
                    }).then(() => {
                        console.log('done')
                    }).catch((err) => {
                        console.log(err)
                    })
                })
            })
    }

    return (
        <div>
            <h2>Add category</h2>
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
                    <Form.Label>Choose Top </Form.Label><br />
                    <select onChange={handleChange('top')} >
                        <option>Please Select</option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </Form.Group>
                <div>
                    <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger"  onClick={handleSubmit}>
                        Create Category
                </Button>
                </div>
            </Form>
        </div>
    );
};

export default Addcat;