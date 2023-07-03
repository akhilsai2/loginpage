import { createSlice } from "@reduxjs/toolkit";
import { sum } from "mathjs"

const initialState = {
    listItems: [], amount: 0
}
const cart = createSlice({
    name: "products",
    initialState,
    reducers: {
        add(state, action) {
            state.listItems.push(action.payload)
            state.amount = state.amount + action.payload.price
        },
        remove(state, action) {

            state.amount = state.amount - sum(state.listItems.filter((item) => item.id === action.payload.id).map(x => x.price))
            state.listItems = state.listItems.filter((item) => item.id !== action.payload.id)
        },
        addQuantity(state, action) {
            state.listItems.push(action.payload)
            state.amount = state.amount + action.payload.price
        },

        deleteItems(state) {
            state.listItems = []
            state.amount = 0
        }

    }
})
// console.log(intialState)
export const { add, remove, deleteItems, addQuantity } = cart.actions
export default cart.reducer

export function addProduct(product) {
    return (dispatch, getState) => {
        const state = getState()
        // console.log(state.cart)
        const { listItems } = state.cart
        if (listItems.includes(product)) {
            dispatch(add(product))
        } else {
            dispatch(add(product))
        }
    }
}

export function removeProduct(product) {
    return (dispatch, getState) => {
        dispatch(remove(product))
    }
}

export function quantityProduct(product) {
    return (dispatch, getState) => {
        dispatch(addQuantity(product))
    }
}