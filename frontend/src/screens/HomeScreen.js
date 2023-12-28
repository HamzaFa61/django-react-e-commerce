import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { Container, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let keyword = searchParams.get('keyword') || '';
    let pageNumber = searchParams.get('page') || 1;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <Container>
            {!keyword && <ProductCarousel />}
            <h1 className='my-4'>
                Latest Products
            </h1 >
            {
                loading ? <Loader />
                    : error ? <Message variant='danger'>{error}</Message>
                        :
                        <>
                            <Row>
                                {products.map(product => (
                                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                        </>
            }
        </Container>
    )
}

export default HomeScreen