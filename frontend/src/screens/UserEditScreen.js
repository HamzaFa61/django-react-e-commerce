import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import { updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserEditScreen() {
    const { id } = useParams()

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        }
        if (!user.name || user.id !== Number(id)) {
            dispatch(getUserDetails(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, navigate, user, id, success])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ 'id': id, 'name': name, 'email': email, 'isAdmin': isAdmin }))
    }

    return (
        <Container>
            <Link to='/admin/userlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
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

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='email@example.com'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin'>
                            <Form.Label>Password</Form.Label>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            >
                            </Form.Check>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </Container>

    )
}

export default UserEditScreen