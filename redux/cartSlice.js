import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./service/authService";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import axios from 'axios'
import Router from 'next/router'

const initialState = {
  cartItems: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
}

// Thunks
export const register = createAsyncThunk('cart/register', async (user) => {
  const loginUser = async () => {
    const response = await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
      callbackUrl: '/'
    })
  }
  try {
    if(user.password !== user.passwordConfirm) {
      return toast.warn('Check passwords again')
    }
    const request = await axios.post('/api/account/register', user)
    
    if(request.data.success) {
      toast.success('Successfully Registered')
      await loginUser()
      Router.push('/')
      await authService.checkSession(user)
    }
    // return await authService.register(user)
  } catch (error) {
    return toast.error(`${error.response.data.message}`)
  }
})

export const checkSession = createAsyncThunk('cart/checkSession', async (user) => {
  try {
    return await authService.checkSession(user)
  } catch (error) {
    return toast.error(`${error.response.data.message}`)
  }
})

export const checkSessionAgain = createAsyncThunk('cart/checkSessionAgain', async (user) => {
  try {
    return await authService.checkSessionAgain(user)
  } catch (error) {
    return toast.error(`${error.response.data.message}`)
  }
})

export const logout = createAsyncThunk('cart/logout', async () => {
  await authService.logout()
  Router.push('/account/login')
})

export const login = createAsyncThunk('cart/login', async (user) => {
  try {
    const request = await signIn('credentials', {
      redirect: false,
      email: user.email,
      password: user.password,
      callbackUrl: '/account/login'
    })
    if(request.error) {
      toast.error(`${request.error}`)
    }
    if(request.ok) {
      toast.success('login successful')
    }
    return request
  } catch (error) {
    return toast.error(`${error.response.data.message}`)
  }
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // all actions
    // Cart
    addToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload]
    },
    removeFromCart: (state, action) => {
      let foundItem = state.cartItems.find((item) => (item.product.id === action.payload.product.id))
      let filteredCart = state.cartItems.filter((item) => item !== foundItem)
      if (!!foundItem) {
        state.cartItems = filteredCart
      } 
    },
    // increase qty
    qtyIncrease: (state, action) => {
      state.cartItems.forEach((item) => {
        if (item.product.id === action.payload.product.id) {
          item.qty += 1
        }
      })
    },
    // decrease qty
    qtyDecrease: (state, action) => {
      console.log(action, 'decrease')
      state.cartItems.forEach((item) => {
        if(item.product.id === action.payload.product.id) {
          if(item.qty > 1) {
            item.qty -= 1
          } else {
            item.qty = 1
          }
        }
      })
    },
    cartReset: (state, action) => {
      if(!!action) {
        state.cartItems = []
      }
    },
    resetStatus: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  }
})

export const { addToCart, removeFromCart, cartReset, qtyIncrease, qtyDecrease, resetStatus, } = cartSlice.actions

export const selectItems = (state) => state.cart.cartItems

export default cartSlice.reducer