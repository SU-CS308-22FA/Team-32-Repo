import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,  useNavigate, Link } from 'react-router-dom'
import { register } from '../actions/userAction'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader  from '../components/Loader'
import FormContainer from '../components/FormContainer';


function RegisterScreen() {
    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state=>state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(()=>{
        if(userInfo){
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submithandler=(e) =>{
        e.preventDefault()
        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(register(name,email,password))
        }
    }


  return (
    <div>
        <FormContainer>
            <h1>Register</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submithandler}>
            <Form.Group controlId='name'>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                type='text'
                placeholder='Enter a username'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                
                >
             </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                type='email'
                placeholder='Enter your email address'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                
                >
             </Form.Control>
            </Form.Group>


            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}>
             </Form.Control>
            </Form.Group>


            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}>
             </Form.Control>
            </Form.Group>


            <Button type='submit' variant='danger'>Register</Button>
             </Form>


             <Row className='py-3'>
                <Col>
                 Already registered? <Link to={redirect? `/login?redirect={redirect}`: '/login'}>Login</Link>
               
                </Col>
            </Row>
        </FormContainer>
    </div>
  )
}

export default RegisterScreen