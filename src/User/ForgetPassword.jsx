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
    <Fragment>
      <ToastContainer />
      <div className='hwami'>
        <h2>Forgot Password</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control type="email" placeholder="Enter email" onChange={handleChange('email')} value={email} />
          </Form.Group>
          <Button type="submit"> Submit </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default ForgetPassword;