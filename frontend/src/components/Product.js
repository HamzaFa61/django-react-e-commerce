import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Review from './Review'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <>
            <Card className='my-3 p-3 rounded' style={{ width: '18rem' }}>
                <Link to={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <Card.Text as='div'>
                        <div className='my-3'>
                            <Review value={product.rating} text={`${product.numReviews} reviews`} color='#f8e825' />
                        </div>
                    </Card.Text>
                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product