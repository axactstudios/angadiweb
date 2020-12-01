import React, { useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import * as firebase from 'firebase'
import '../Styles/Form.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    textChange: 'SignIn'
  });
  const { email, password1 } = formData;
  const db = firebase.firestore()

  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
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
          } else {
            db.collection('Users').where("id", "==", `${result.user.uid}`).get()
              .then(res => {
                res.forEach((doc) => {
                  authenticate(doc.data(), () => {
                    setFormData({
                      ...formData,
                      email: '',
                      password1: '',
                      textChange: 'signin Successfully done'
                    })
                  })
                  console.log(doc.data())
                  toast.success(`Welcome back ${doc.data().Name}`)
                })
              })
          }
        })
        .catch(err => {
          setFormData({
            ...formData,
            email: '',
            password1: '',
            textChange: 'Sign In'
          });
          console.log(err);
          toast.error(err.message);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <div className="form">
      {isAuth() ? <Redirect to='/user/dashboard' /> : null}
      <ToastContainer />
      <div className="form-main">
        <div className="form-fields">
          <h1>Login</h1>
          <form
            onSubmit={handleSubmit}
          >
            <input type="email"
              className="form-input"
              placeholder="Email"
              onChange={handleChange('email')}
              value={email}
            />
            <input type="password"
              className="form-input"
              placeholder="Password"
              onChange={handleChange('password1')}
              value={password1}
            />
            <button className="form-button">Login</button>
            <Link
              to="/users/password/forget"
              className="util-link"
            >
              Forget password?
            </Link>
          </form>
          <div className="util">
            Don't have an account ?
            <a
              className="util-link"
              href="/register"
              target="_self"
            > Sign Up </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
