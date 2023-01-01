import React, {useState, useEffect} from "react"
import { useParams, useNavigate } from 'react-router-dom'
import Rating from "../components/Rating"
import '../my.css'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from "../actions/productListAction"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { Form, Row, Col } from 'react-bootstrap'


function Productpage() {
    const [qty, setQty] = useState()
    const { id } = useParams();
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
  
    useEffect(() => {
        dispatch(listProductDetails(`${id}`))
   
    }, [])

    let navigate = useNavigate();
    const addToCartHandler = () => {
        let path = (`/cart/${id}?qty=${qty}`)
        navigate(path)
    }

    return (
        <div>


    {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>  
            : 
                        <Row>
                            <div className="header">
                                <div className="row">
                                    <div className="col-md-9"><h2 className="product-title underline"> {product.name}</h2></div>
                                    <div className="col-md-3"><Rating value={product.rating} color="#ffdff00"></Rating></div>
                                    <p className="test-right numve"><i className="fa fa-eye">Views: {product.numReviews}</i></p>
                                </div>
                            </div>
                            <div className="container-body mt-20">
                                <div className="row">
                                    <div className="col-md-5">
                                        <ul>
                                            <li> Category: {product.category}</li>
                                            <li> Team: {product.brand}</li>
                                            <li> Stock: {product.countInStock}</li>
                                            <li> Price: {product.price}</li>
                                        </ul>
                                    <div className="col-md-12">{product.description}</div>

                                    <div className="col-md-12 mt-20">
                                        {product.countInStock > 0 && (
                                            <Row>
                                                <Col>Quantity</Col>
                                                <Col>
                                                    <Form.Control as="select" value={qty} onChange={(e)=> setQty(e.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}> {x + 1} </option>
                                                            ))

                                                        }
                                                    </Form.Control>
                                                   
                                                </Col>
                                            </Row>
                                        )}
                                    </div>

                                    <div className="col-md-12 mt-20">
                                        {product.countInStock <= 1 && (
                                            <Message variant='danger'>Out of stock.</Message> 
                                        )}
                                    </div>


                                    
                                    <div className="col-md-12 mt-20">
                                        <Button onClick={addToCartHandler} variant="danger"><i className="fa-solid fa-cart-shopping"></i> Add to cart</Button>
                                    </div>
                                    </div>
                                    <div className="col-md-7">
                                        <img src={product.image} alt="" className="card-img img-fluid img-detail-full"></img>
                                    </div>
                                </div>
                            </div>
                        </Row>
      }
           

        </div>
    )
}


export default Productpage