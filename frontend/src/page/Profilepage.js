import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,  useNavigate } from 'react-router-dom'
import { getUserDetails, register, updateUserProfile } from '../actions/userAction'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader  from '../components/Loader'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function Profilepage() {

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const history = useNavigate()


    const userDetails = useSelector(state=>state.userDetails)
    const { error, loading, user } = userDetails
    console.log(userDetails)
    
    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin
    console.log(userLogin)

    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const { success } = userUpdateProfile
    console.log(userUpdateProfile)

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                //dispatch(getUserDetails('profile')) // this line is causing infinite loop

            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e)=>{
        e.preventDefault()

        if(password!==confirmPassword){
            setMessage('Passwords do not match.')
        }
        else
        {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password':password
            }))
            setMessage('')
        }
    }

     return (
    <div>
        <Row>
            <Col md={4}>
                <h2 className='product-title'>My Profile</h2>
                {message && <Message variant='danger'>{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Userame</Form.Label>
                        <Form.Control
                         required 
                        type='name'
                        placeholder='Enter your new username'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                         required 
                        type='email'
                        placeholder='Enter your new email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                         required 
                        type='password'
                        placeholder='Enter your new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                     
                        ></Form.Control>
                </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                         required 
                        type='password'
                        placeholder='Confirm your new password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}                      
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='warning'>Update</Button>
                </Form>           
            </Col>
          </Row>
    </div>
  )
}

export default Profilepage