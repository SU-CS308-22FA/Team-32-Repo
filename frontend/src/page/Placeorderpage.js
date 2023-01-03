import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button, Card, ListGroup, Image } from 'react-bootstrap'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import { createOrder } from '../actions/orderAction'

function Placeorderpage() {
    const cart = useSelector(state => state.cart)
    
    cart.ItemsPrice = cart.cartItems.reduce((acc, item) =>acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.ItemsPrice> 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.088) * cart.ItemsPrice).toFixed(2)
    cart.TotalPrice =  ( Number(cart.ItemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice) )
    const dispatch = useDispatch()
    const history = useNavigate()

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate


    if (!cart.paymentMethod)
    {
        history('/payment')
    }

    useEffect(() => {
        if (success) {
            history(`/order/${order._id}`)
            dispatch({type: ORDER_CREATE_RESET})
        }
    }, [success, history])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            ItemsPrice: cart.ItemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            TotalPrice: cart.TotalPrice,
            postalCode: cart.postalCode
        }))
    }

  
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='ordertm'>
                            <h4>Order Details</h4>
                            
                        </ListGroup.Item>

                        <ListGroup.Item className='ordertm2'>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}

                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup variant='flush'>
                        <ListGroup.Item className='ordertm'>
                            <h4>Payment Details</h4>
                            
                        </ListGroup.Item>

                        <ListGroup.Item className='ordertm2'>
                            <p>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup>
                        <ListGroup.Item className='ordertm'>
                            <h2>Product</h2>
                        </ListGroup.Item>

                        <ListGroup.Item className='ordertm2'>
                            {cart.cartItems.length === 0 ? <Message variant='info'>Your cart is empty.</Message> :
                                (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) =>
                                        (
                                            <ListGroup.Item key={index} className='ordertm2'>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>

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
                                    <Col>₺{cart.ItemsPrice}</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item className='ordertm2'>


                                <Row>
                                    <Col>Cargo:</Col>
                                    <Col>₺{cart.shippingPrice}</Col>
                                </Row>

                             </ListGroup.Item>
                             <ListGroup.Item className='ordertm2'>

                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>₺{cart.taxPrice}</Col>
                                </Row>
                             </ListGroup.Item>
                                <ListGroup.Item className='ordertm2'>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>₺{cart.TotalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                            <ListGroup.Item className='ordertm2'>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item className='ordertm2'>
                                <Button type='button' onClick={placeOrder} disabled={cart.cartItems === 0} variant='danger'>Complete Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </div>
  )
}

export default Placeorderpage