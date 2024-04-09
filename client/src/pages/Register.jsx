import { Form, Input,message } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Loader } from '../components/layouts/Loader';
function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
const submitHandler = async (values)=>{
try {
    setLoading(true)
    await axios.post('/users/register',values);
    message.success('Successfully Register')
    setLoading(false)
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


  return (
   <div className="register">
{loading && <Loader/>}

<Form layout='vertical' onFinish={submitHandler}>
<h1>Register Here</h1>
<Form.Item label='Name' name='name'>
<Input/>
</Form.Item>
<Form.Item label='Email' name='email'>
<Input type='email'/>
</Form.Item>
<Form.Item label='Password' name='password'>
<Input type='password'/>
</Form.Item>
<div className="d-flex justify-content-between flex-column">
    <Link to='/login' className='text-decoration-none'>Already Register ? Click here to login</Link>
    <button className='btn btn-success'> Register</button>
</div>
</Form>

   </div>
  )
}

export default Register