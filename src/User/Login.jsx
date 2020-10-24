import React, { useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import * as firebase from 'firebase'

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'SignIn'
  });
  const { email, password1 } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
    console.log(formData)
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email && password1) {
      setFormData({ ...formData, textChange: 'Submitting' });

      firebase.auth().signInWithEmailAndPassword(email, password1)
        .then(result => {
          if (!result.user.emailVerified) {
            toast.error('Please verify your email before to continue')
            firebase.auth().signOut();
          }
          console.log(result)
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err);
          toast.error('Something went wrong');
        });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <Fragment>
      <ToastContainer />
      {isAuth() ? <Redirect to='/' /> : null}
      <div style={{ width: '50%', margin: 'auto' }}>
        <h2><span>Sign In</span> <span>| Sign Up</span></h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group >
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
          </Form.Group>
          <Form.Group >
            <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
          </Form.Group>
          <Form.Group >
            <Link to='/users/password/forget'>Forget password?</Link>
          </Form.Group>
          <Form.Group >
            <Form.Text>
              <h6>Don't have an account ?
                 <a href='/register' target='_self'>
                  <span >Sign Up</span>
                </a>
              </h6>
            </Form.Text>
          </Form.Group>
          <Button type="submit"> Log In</Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Login;
