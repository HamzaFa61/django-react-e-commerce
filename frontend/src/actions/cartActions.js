import {
    ADD_TO_CART,
    REMOVE_ITEM,
} from "../constants/cartConstants";
import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            count_in_stock: data.count_in_stock,
            qty,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
