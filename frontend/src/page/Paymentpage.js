import React from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { savePaymentMethod, saveShippingAddress } from '../actions/cartAction'
import { Form, Button } from 'react-bootstrap'

function Paymentpage() {
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const history = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('Pay')

    if (!shippingAddress.address)
    {
        history('/shipping')
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')

    }
    
    return (
      <div>
          <FormContainer>
                <CheckoutSteps step1 step2 step3/>
                <h2 className='product-title'>Address Details</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='address'>
                        <Form.Label>Select a payment method</Form.Label>
                      <Form.Check
                          type='radio'
                          label='Credit Cart'
                          id='pay'
                          name='paymentMethod'
                          checked
                      onChange={(e) => setPaymentMethod(e.target.value)}>
                          
                        </Form.Check>
                    </Form.Group>                
                  
                    <br></br><Button type='submit' variant='warning'>Submit</Button>
                </Form>     

                
            </FormContainer>
    </div>
  )
}

export default Paymentpage