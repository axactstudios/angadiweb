import React, { useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap'
import * as firebase from 'firebase'

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: ''
  });


  const { email } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if (email) {
      setFormData({ ...formData, textChange: 'Submitting' });
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          setFormData({
            ...formData,
            email: '',
          });
          toast.success(`Reset link sent to your register email !!`);
        })
        .catch(err => {
          toast.error( err.message);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };


  return (
    <div className = "form">
    <ToastContainer />
    <div className = "form-main">
      <div className = "form-fields">
        <h1>Forget Password ?</h1>
        <form
          onSubmit = {handleSubmit}
        >
          <input type = "email" 
            className = "form-input" 
            placeholder = "Email" 
            onChange={handleChange('email')}
            value={email}
          />
          <button type = "submit" className = "form-button">Submit</button>
        </form>
      </div>
    </div>
  </div>
  );
};

export default ForgetPassword;