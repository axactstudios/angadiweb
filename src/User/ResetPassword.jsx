import React, { useState, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button } from 'react-bootstrap';
import * as firebase from 'firebase'

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password1: '',
    password2: ''
  });
  const { password1, password2 } = formData;


  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };


  const handleSubmit = e => {
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      firebase.auth().currentUser.updatePassword(password1)
        .then(() => {
          setFormData({
            ...formData,
            password1: '',
            password2: ''
          });
          toast.success('Password Updated Successfully !!!');
        })
        .catch(err => {
          toast.error(err.message);
          console.log(err.message)
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };


  return (
    <Fragment>
      <ToastContainer />
      <div className='hwami'>
        <h2>Reset Password</h2>
      </div>
      <div className="reg2">
        <div className="reg21">
          <h2>Enter Your Passwords</h2>
          <Form onSubmit={handleSubmit} >
            <Form.Group>
              <Form.Control type="password" placeholder="Password" onChange={handleChange('password1')} value={password1} />
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Confirm Password" onChange={handleChange('password2')} value={password2} />
            </Form.Group>
            <Button className="reg22" type="submit">Submit</Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;