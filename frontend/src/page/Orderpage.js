import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Card, ListGroup, Image } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { getOrderDetails } from '../actions/orderAction'
import { useParams } from 'react-router-dom'

function Orderpage() {

    const { id } = useParams();

    const dispatch = useDispatch()
    const history = useNavigate()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    if(!loading && !error){
        order.ItemsPrice = order.orderItems.reduce((acc, item) =>acc + item.price * item.qty, 0).toFixed(2)
    }

    useEffect(() => {
        if (!userInfo) {
            history('/login')
        }

        if(!order || order._id !== Number(id)){
            dispatch(getOrderDetails(id))
        }
    }, [dispatch, order, id])

  return loading? (<Loader/>)  : error?(<Message variant='danger'>{error}</Message>) :(
    <div>       
        <Message variant='success'>Your purchase is complete.</Message>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='ordertm3'>
                        <h3 className='ordertm'>Personal Information</h3>
                          <p className='ordertm4'><strong>Name: </strong>{order.user.name}</p>
                          <p className='ordertm4'><strong>Email: </strong>{order.user.email}</p>
                    </ListGroup.Item>
                </ListGroup>
              </Col>
              
              <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='ordertm'>
                               <h2>Complete Purchase</h2>
                            </ListGroup.Item>

                            <ListGroup.Item className='ordertm2'>
                                <Row>
                                    <Col>Product:</Col>
                                    <Col>₺{order.ItemsPrice}</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item className='ordertm2'>


                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>₺{order.shippingPrice}</Col>
                                </Row>

                             </ListGroup.Item>
                             <ListGroup.Item className='ordertm2'>

                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>₺{order.taxPrice}</Col>
                                </Row>
                             </ListGroup.Item>
                                <ListGroup.Item className='ordertm2'>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₺{order.TotalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                    
                        </ListGroup>
                    </Card>
              </Col>
              
              <Col md={12}>
                  <br></br>
                  <ListGroup.Item className='ordertm2'>
                      
                            {order.orderItems.length === 0 ? <Message variant='info'>Your order is empty.</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) =>
                                        (
                                            <ListGroup.Item key={index} className='ordertm'>
                                                <Row>
                                                
                                                    <Col md={7}>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} x ₺ {item.price} = ₺ {(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            )
                                        )}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
              </Col>
              
              
        </Row>
    </div>
  )
}

export default Orderpage