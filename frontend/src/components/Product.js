import React from 'react'
import { Button } from 'react-bootstrap'
import Rating from './Rating'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';

function Product({product}) {
  return (
        <div>
            <div className='card mb-10'>
                <div className='card-body'>
                    <div className='card-img-actions'>
                        <img src={product.image} alt="" className='card-img img-fluid'></img>
                    </div>
                </div>
              
                <div className='card-bodu bg-light text-center'>
                    <div className='mb-2'>
                      <h6>
                          <Link to={`/product/${product._id}`}>
                            <a className='product-title'> {product.name}</a>
                          </Link>
                      </h6>
                        <span className='product-category'> {product.category }</span>
                    </div>
                        <Rating value={product.rating} color={'#ffdf00'}></Rating>
                   
                    
                    <div className='text-muted mb-3'>{product.numReviews}</div>
                  <h3 className='mb-10'> ₺{product.price}</h3>
                    <LinkContainer to={`/product/${product._id}`}>
                      <Button style={{ marginBottom: 10 }} variant='danger'><i className="fa-solid fa-cart-shopping"></i> Add to card</Button>
                    </LinkContainer>
                </div>
                    
            </div>
        </div>
  )
}

export default Product