import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import {  Form } from 'react-bootstrap'
import { useRouteMatch } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Editcat = () => {
    let match = useRouteMatch();

    const [values, setValues] = useState({
        name: '',
        image: null,
        top: false,
        photo: '',
        sCat: ''
    })

    useEffect(() => {
        const hamburgerr = document.querySelector('.nav_btn');
        const navlinksss = document.querySelector('.mobile_nav_items')

        hamburgerr.addEventListener("click", () => {
            navlinksss.classList.toggle("active");
        })
    })

    const db = firebase.firestore()
    const _id = match.params.catname
    const storage = firebase.storage()

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

    useEffect(() => {
        db.collection('Categories').doc(_id).get()
            .then(res => {
                const me = res.data()
                setValues({
                    ...values, name: me.catName, photo: me.imageURL,
                    top: me.top, sCat: me.sCat
                })
            })
    }, [])

    const delCat = () => {
        db.collection("Categories").doc(_id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    }

    const handleSubmit = () => {
        if (image === null) {
            db.collection('Categories').doc(_id).update({
                catName: name,
                top: top,
                sCat: sCat
            }).then(() => {
                toast.success('Category Edit successfully !!!')
            }).catch((err) => {
                console.log(err)
                toast.error('Something went wrong !!!')
            })
        } else {
            const uploadTask = storage.ref(`category/${image.name}`).put(image);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress)
            },
                (error) => {
                    console.log(error)
                    toast.error('Something went wrong in uploading image !!')
                },
                () => {
                    storage.ref('category').child(image.name).getDownloadURL().then(async url => {
                        console.log(url)
                        db.collection('Categories').doc(_id).update({
                            imageURL: url,
                            catName: name,
                            top: top,
                            sCat: sCat
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
        <div>
            <ToastContainer />

            <div className='content1'>
                <h2 style={{fontWeight: "bold", margin: "0.5em 0"}}>Edit category</h2>
                <Form className="edit-dish-form">
                    <Form.Group className="edit-dish-form-input">
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Category</Form.Label>
                        <Form.Control type="text" placeholder="Name" onChange={handleChange('name')} value={name} />
                    
                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Sub-Category</Form.Label>
                        <Form.Control type="text" placeholder="SCat" onChange={handleChange('sCat')} value={sCat} />

                        <Form.Label style={{fontWeight: "bold", margin: "1em 0 0.5em 0"}}>Choose Top </Form.Label><br />
                        {JSON.stringify(top)} &nbsp;
                        <select onChange={handleChange('top')} >
                            <option>Please Select</option>
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </Form.Group>
                    <Form.Group className="edit-dish-form-input">
                        <Form.File id="formcheck-api-custom" custom>
                          <Form.File.Input onChange={handleChange('image')} accept='image/*' isValid />
                          <Form.File.Label data-browse="Choose Icon">Category Icon</Form.File.Label>
                        </Form.File>
                        <img src={photo}/>
                    </Form.Group>
                </Form>
                <div className="edit-button-group">
                  <button onClick={handleSubmit}>Edit Category</button>
                  <button id="edit-delete-button" onClick={delCat}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Editcat;