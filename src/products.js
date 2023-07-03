import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StatusCode from "./uitils";
export const getProducts = createAsyncThunk("products/get", async () => {
    const response = await fetch("https://dummyjson.com/products")
    const result = await response.json()
    // console.log(result)
    return result.products
})

const initialState = {
    data: [],
    status: StatusCode.IDLE
}


const products = createSlice({
    name: "products",
    initialState,

    extraReducers: {
        // console.log(bulider)

        [getProducts.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = StatusCode.IDLE
        },
        [getProducts.pending]: (state, action) => {
            state.data = action.payload
            state.status = StatusCode.LOADING
        },
        [getProducts.rejected]: (state, action) => {
            state.data = action.payload
            state.status = StatusCode.ERROR
        }


    }
})
// console.log(intialState)
export const { fetchProducts } = products.actions
export default products.reducer



// export function getProducts() {
//     return async function getProductsThunk(dispatch, getState) {
//         const response = await fetch("https://dummyjson.com/products")
//         const result = await response.json()
//         console.log(result)
//         dispatch(fetchProducts(result))
//     }
// }