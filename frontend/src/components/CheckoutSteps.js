import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({step1, step2, step3, step4}) {
  return (
    <div>
          <Nav className='justify-content-center mb-4'>
            <Nav.Item>
                {step1 ?(
                    <LinkContainer to='/products'>
                        <Nav.Link>Login</Nav.Link>
                    </LinkContainer>                    
                        ) :
                        (
                            <Nav.Link disabled>Login</Nav.Link>
                        )
                }    
              </Nav.Item>
              
            <Nav.Item>
                {step2 ?(
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Address Details</Nav.Link>
                    </LinkContainer>                    
                        ) :
                        (
                            <Nav.Link disabled>Address Details</Nav.Link>
                        )
                }    
              </Nav.Item>  
              
              <Nav.Item>
                {step3 ?(
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>                    
                        ) :
                        (
                            <Nav.Link disabled>Payment</Nav.Link>
                        )
                }    
              </Nav.Item> 
              
              <Nav.Item>
                {step4 ?(
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Checkout</Nav.Link>
                    </LinkContainer>                    
                        ) :
                        (
                            <Nav.Link disabled>Payment Successful</Nav.Link>
                        )
                }    
            </Nav.Item> 
          </Nav> 

    </div>
  )
}

export default CheckoutSteps