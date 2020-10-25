import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase'
import { Button, Form } from 'react-bootstrap'

const Editcat = ({ match }) => {

    const [values, setValues] = useState({
        name: '',
        image: null,
        top: false,
        photo: ''
    })

    const db = firebase.firestore()
    const _id = match.params.catname

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

    useEffect(() => {
        db.collection('Categories').doc(_id).get()
            .then(res => {
                const me = res.data()
                setValues({...values, name:me.catName, photo:me.imageURL,
                top: me.top})
            })
    }, [])

    const delCat = () => {
        db.collection("Categories").doc(_id).delete().then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
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
                    {JSON.stringify(top)}
                    <select onChange={handleChange('top')} >
                        <option>Please Select</option>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </Form.Group>
                <div>
                    <Button className="btn btn-danger" style={{ 'border-radius': '13px' }} variant="danger">
                        Create Category
            </Button>
                </div>
            </Form>
            <button onClick={delCat} >Delete</button>
        </div>
    );
};

export default Editcat;