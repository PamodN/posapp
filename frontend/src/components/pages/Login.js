import React, { useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      dispatch({ type: 'SHOW_LOADING' });

      // Log the form values to verify what's being sent
      console.log('Form Values:', values);

      const res = await axios.post('/api/users/login', values);

      console.log('Backend Response:', res.data); // Log response for debugging

      if (res.data.success) {
        message.success('User logged in successfully');
        localStorage.setItem('auth', JSON.stringify(res.data.token));
        navigate('/');
      } else {
        message.error(res.data.message || 'Invalid credentials');
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Something went wrong');
      console.error('Login Error:', error.response || error);
    } finally {
      dispatch({ type: 'HIDE_LOADING' });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className='register'>
      <div className='register-form'>
        <h1>POS App</h1>
        <h3>Login Page</h3>

        <Form layout='vertical' form={form} onFinish={handleSubmit}>
          <Form.Item
            name='userId'
            label='User ID'
            rules={[{ required: true, message: 'Please enter your User ID' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>

          <div className='d-flex justify-content-between'>
            <p>
              Not a user? Please <Link to='/register'>Register Here!</Link>
            </p>
            <Button type='primary' htmlType='submit'>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
