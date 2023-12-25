import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

function ProductEditScreen() {
    const { id } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [count_in_stock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            navigate('/admin/productList')
        } else {
            if (!product.name || product.id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setBrand(product.brand)
                setCountInStock(product.count_in_stock)
                setDescription(product.description)
            }
        }

        if (!product.name || product.id !== Number(id)) {
            dispatch(listProductDetails(id))
        } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setCategory(product.category)
            setBrand(product.brand)
            setCountInStock(product.count_in_stock)
            setDescription(product.description)
        }
    }, [dispatch, navigate, product, id, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            id: Number(id),
            name,
            price,
            image,
            category,
            brand,
            count_in_stock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', id)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)
        }
        catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <Container>
            <Link to='/admin/productList' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>

                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        {/* <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Image'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group> */}

                        <Form.Group controlId='image-file' className='mt-2'>
                            <Form.Label>Image File</Form.Label>
                            <p style={{ fontSize: 13 }}>{image}</p>
                            <Form.Control
                                type='file'
                                placeholder='Choose File'
                                accept='image/*'
                                onChange={uploadFileHandler}
                            >
                            </Form.Control>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='count_in_stock'>
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Count In Stock'
                                value={count_in_stock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Button className='mt-3' style={{
                            float: 'right'
                        }} type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </Container>

    )
}

export default ProductEditScreen