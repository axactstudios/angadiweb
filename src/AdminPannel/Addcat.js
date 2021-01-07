import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase'
import { Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'

const Addcat = () => {

    const [values, setValues] = useState({
        name: '',
        image: null,
        top: false,
        photo: '',
        sCat: ''
    })

    const storage = firebase.storage()
    const store = firebase.firestore()

    const { name, image, top, photo, sCat } = values

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
                toast.error('Something went wrong in uploading image !!')
            },
            () => {
                storage.ref('category').child(image.name).getDownloadURL().then(async url => {
                    console.log(url)
                    await store.collection('Categories').add({
                        imageURL: url,
                        catName: name,
                        top: top,
                        sCat: sCat
                    }).then(() => {
                        toast.success('Category Added !!!')
                    }).catch((err) => {
                        toast.error('Something went wrong !!!')
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
            <div className='content1'>
                <h2>Add category</h2>
                <Form>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Name" onChange={handleChange('name')} value={name} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="SCat" onChange={handleChange('sCat')} value={sCat} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label >Choose Images</Form.Label>
                        <Form.Control type="file" name='image' accept='image/*' onChange={handleChange('image')} />
                    </Form.Group>
                    <div>
                        <img src={photo} style={{ width: '110px' }} />
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
                        <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger" onClick={handleSubmit}>
                            Create Category
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Addcat;