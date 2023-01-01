import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { saveShippingAddress } from '../actions/cartAction'
import { Form, Button } from 'react-bootstrap'

function Shippingpage() {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    const dispatch = useDispatch()
    const history = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalcode, setPostalCode] = useState(shippingAddress.postalcode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalcode, country }))
        history('/payment')

    }

    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h2 className='product-title'>Address Details</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Enter your address'
                        value={address ? address: ''}
                        onChange={(e) => setAddress(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Enter your city'
                        value={city ? city: ''}
                        onChange={(e) => setCity(e.target.value)}
                        
                        ></Form.Control>


                    </Form.Group>

                    <Form.Group controlId='postalcode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Enter your postal code'
                        value={postalcode ? postalcode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}                     
                        ></Form.Control>
                </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                         required 
                        type='text'
                        placeholder='Enter your Country'
                        value={country ? country : ''}
                        onChange={(e) => setCountry(e.target.value)}                      
                        ></Form.Control>
                    </Form.Group>
                    <br></br><Button type='submit' variant='warning'>Submit</Button>
                </Form>     

                
            </FormContainer>
        </div>
    )
}

export default Shippingpage