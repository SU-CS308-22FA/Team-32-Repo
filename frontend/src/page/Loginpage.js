import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,  useNavigate } from 'react-router-dom'
import { login } from '../actions/userAction'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader  from '../components/Loader'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';


function Loginpage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin
    
    useEffect(() => {
        if (userInfo) {
            history(redirect)
        }
    }, [history, userInfo, redirect])

    const submithandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }


  return (
      <div>
          <FormContainer>
              <h1>Login</h1>
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader></Loader>}

              <Form onSubmit={submithandler}>
              <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                      type='email'
                      placeholder='Email address...'
                      value={email}
                  onChange={(e)=> setEmail(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type='password'
                      placeholder='***********'
                      value={password}
                  onChange={(e)=> setPassword(e.target.value)}>
                      
                  </Form.Control>
              </Form.Group>

              <Button type='submit' variant='danger'>Login</Button>
              </Form>
              <Row className='py-3'>
                  <Col>
                    Are you not registered? <Link to={redirect? `/register?redirect={redirect}`: '/register'}> Register now</Link>
                  </Col>
              </Row>
          </FormContainer>
    </div>
  )
}

export default Loginpage