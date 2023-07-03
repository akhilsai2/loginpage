import React from 'react'

import products from './products'
import { configureStore } from '@reduxjs/toolkit'
import cart from './cart'

const store = configureStore({
    reducer: {
        product: products,
        cart: cart

    }
})
export default store
