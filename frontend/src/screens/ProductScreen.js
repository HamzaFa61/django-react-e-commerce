import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Container, Form } from 'react-bootstrap'
import Review from '../components/Review'
import Loader from '../components/Loader'
import Message from '../components/Message'

function ProductScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }
    return (
        <>
            <Container>
                <Link className="btn btn-light my-3" to="/">
                    Go Back
                </Link>
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
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
                                    {product.count_in_stock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col xs="auto" className="my-1">
                                                    <Form.Control
                                                        as="select"
                                                        value={product.qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.count_in_stock).keys()].map((x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
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
                }
            </Container>
        </>
    )
}

export default ProductScreen