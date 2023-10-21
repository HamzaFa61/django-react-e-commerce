import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return (
        <Container>
            <h1 className='my-4'>
                Latest Products
            </h1 >
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default HomeScreen