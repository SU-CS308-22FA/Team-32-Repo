import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { Row, Col, ListGroup, Form, Button, Image, ListGroupItem, Card } from 'react-bootstrap'
import Message  from '../components/Message'
import { Link } from 'react-router-dom';

function Cardpage() {


    const { id } = useParams();
    const useQty = useLocation()
    const qty = isNaN(useQty.search.split('=')[1]) ? 1 : Number(useQty.search.split('=')[1]);
    console.log({ id, qty })
    
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    
    useEffect(() =>
        {
            if (id) {
                dispatch(addToCart(id,qty))
            }
        }, [dispatch, id, qty]

    )

  return (
    <div>
        <Row>
            <Col md={8}>
                <h1 className='product-title'>My Cart</h1>
                  {cartItems.length === 0 ? (
                      <Message variant='info'>
                          My cart is empty <Link to= '/products'>Products</Link>
                      </Message>
                  ) : (
                          <ListGroup variant='flush'>
                              {cartItems.map(item => (
                                
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                            <Col md={2}>
                                                <Image src={item.image} width='80' alt ={item.image}/>
                                            </Col>

                                            <Col md={2}>
                                                <Link  to='/'>{item.name}</Link>
                                            </Col>

                                            <Col md={2}>
                                                {item.price}
                                            </Col>
                                          
                                            <Col md={2}>
                                                <Form.Control as='select' value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                      [...Array(item.countInStock).keys()].map((x) =>
                                                          <option key={x + 1} value={x + 1}>{x + 1}</option>  
                                                      
                                                      )
                                                    }
                                                </Form.Control>
                                          </Col>
                                          
                                          <Col md={1}>
                                              <Button onClick={()=> removeFromCartHandler(item.product)} type='button' variant='danger'><i className='fa fa-trash'></i> </Button>
                                          </Col>
                                    </Row>
                                </ListGroup.Item>

                              ))}
                          </ListGroup>
                  )
                    
                }


            </Col>
              <Col md={4}>
                  <Card>
                      <ListGroup variant='flush'>
                          <ListGroupItem>
                              <h2>Products in your cart: ({cartItems.reduce((acc, item)=> acc+item.qty, 0)})</h2>
                          </ListGroupItem>
                          
                      </ListGroup>
                  </Card>
              </Col>
        </Row>  


    </div>
  )
}

export default Cardpage