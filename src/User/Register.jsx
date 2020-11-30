import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { isAuth } from '../helpers/auth';
// import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import * as firebase from 'firebase'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    textChange: 'Register'
  });

  const db = firebase.firestore();


  const { name, email, password1, password2 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (name && email && password1) {
      if (password1 === password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        await firebase.auth().createUserWithEmailAndPassword(email, password1)
          .then(async res => {
            res.user.updateProfile({
              displayName: name
            })

            //Save data in firestore
            await db.collection('Users').doc(res.user.uid).set({
              Name: name,
              id: res.user.uid,
              mail: email,
              pUrl: '',
              role: 'user'
            }).then(resp => {
              console.log('done', resp)
            })

            // URL of my website.
            const myURL = { url: 'http://localhost:3000/' }

            // Send Email Verification and redirect to my website.
            res.user.sendEmailVerification(myURL)
              .then(() => {
                toast.success('verify your email')
              })
              .catch(error => {
                toast.error(error.message)
              })

            // Sign Out the user.
            firebase.auth().signOut();
            toast.success('Done')
          })
          .catch(err => {
            setFormData({
              ...formData,
              textChange: 'Sign Up'
            });
            toast.error(err.response);
            console.log(err);
          });
      } else {
        toast.error("Passwords don't matches");
      }
    } else {
      toast.error('Please fill all fields');
    }
  };

  return (
    <div className="reg2 hwami">
      <ToastContainer />
      <div className="reg21">
        <h2><span>Sign Up</span></h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Control type="text" placeholder="name" onChange={handleChange('name')} value={name} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
          </Form.Group>
          <Form.Group>
            <Form.Control type="password" placeholder="confirm Password" onChange={handleChange('password2')} value={password2} />
          </Form.Group>
          <Form.Group>
            <Form.Text className="text-muted" className="reg23">
              <h6>Already have an account ?  <a href='/login' target='_self'><span>Sign In</span></a></h6>
            </Form.Text>
          </Form.Group>
          <Button className="reg22" type="submit">
            {formData.textChange}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;