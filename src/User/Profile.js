import React, { useState, useEffect } from 'react';
import { isAuth } from '../helpers/auth';
import * as firebase from 'firebase'
import { toast, ToastContainer } from 'react-toastify'
import '../Styles/updateform.css'

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
      <div className="update-form">
        <ToastContainer />
        <div className="update-form-main">
          <div className="update-form-fields">
            <form
              onSubmit={clickSubmit}
            >
              <input type="text"
                className="update-form-input"
                placeholder="Name"
                onChange={handleChange('name')}
                value={name}
              />
              <input type="email"
                className="update-form-input"
                placeholder="Email"
                value={email}
              />
              <div>
                <input type="file"
                  accept='image/*'
                  className="update-form-img"
                  onChange={handleChange('purl')}
                />
                <img src={photo} style={{ height: '110px', width: '110px' }} />
              </div>
              <button type="submit" className="update-form-button">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Profile;