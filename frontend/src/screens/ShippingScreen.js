import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

function ShippingScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='address'
                        placeholder='Enter Address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='my-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='city'
                        placeholder='Enter City'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='my-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='postalCode'
                        placeholder='Enter Postal Code'
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='my-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='country'
                        placeholder='Enter Country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-3' style={{
                    float: 'right'
                }}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen