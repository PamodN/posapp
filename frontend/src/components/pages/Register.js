import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import {useDispatch} from 'react-redux';
const Register = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [form] = Form.useForm();
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post('/api/users/register', values);
      message.success('User registered successfully');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
      message.error(error.response?.data?.message || 'Something went wrong');
    }
    
  };
  useEffect(()=>{
    if (localStorage.removeItem('auth')) {
      localStorage.removeItem('auth');
      navigate('/')
    }
   

  },[navigate])

  return (
    <div className='register'>
      <div className="register-form">
      <h1>pos app</h1>
      <h3>Register Page</h3>

      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item name='name' label="Name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='userId' label="User ID" rules={[{ required: true, message: 'Please enter your user ID' }]}>
          <Input />
        </Form.Item>
        <Form.Item name='password' label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='reenterPassword'
          label="Re-enter Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please re-enter your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}

        <div className='d-flex justify-content-between'>
          <p>
            Already registered? <Link to="/login">Login Here!</Link>
          </p>
          <Button type='primary' htmlType='submit'>Register</Button>
        </div>
      </Form>
      </div>
    </div>
  );
};

export default Register;
