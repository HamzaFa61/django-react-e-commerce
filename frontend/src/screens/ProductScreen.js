import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container } from 'react-bootstrap'
import Review from '../components/Review'

function ProductScreen() {
    const { id } = useParams()
    const [product, setProduct] = useState([])
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
        fetchProduct()
    }, [])
    return (
        <>
            <Container>
                <Link className="btn btn-light my-3" to="/">
                    Go Back
                </Link>
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Review
                                    value={product.rating}
                                    text={`${product.num_reviews} reviews`}
                                    color='#f8e825'
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.count_in_stock > 0
                                                ? 'In Stock'
                                                : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                        className="btn-block"
                                        type="button"
                                        disabled={product.count_in_stock === 0}
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductScreen