import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/layouts/Loader";
const Login = () => {

 const navigate = useNavigate();
const [loading, setLoading] = useState(false)
const submitHandler = async (values)=>{
    console.log(values,"values")
try {
    setLoading(true)
    const {data} =await axios.post('/users/login',values);
    message.success('Successfully Login')
    setLoading(false)
    localStorage.setItem('user',JSON.stringify({...data.user,Password:''}))
    navigate('/')
} catch (error) {
    setLoading(false)
    message.error('Something Went Wrong')
}
}

useEffect(() => {
  if(localStorage.getItem('user')){
    navigate('/')
  }
}, [navigate])

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
 
  
    <div className="register">
   
   {loading && <Loader/>}
      <Form
        layout="vertical"
       
        onFinish={submitHandler}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
              <h1>Login Here</h1>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Link to="/register">Don't Have Account ? Click here to Register</Link>
      </Form>
    </div>

  );
};

export default Login;
