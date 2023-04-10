import {signIn, signOut } from 'next-auth/react'
import axios from 'axios'

// Checking Session
const checkSession = async (userData) => {
  const foundaccount = await axios.post('/api/account/findAccount', userData)
  if(foundaccount.data) {
    let savingData = {
      id: foundaccount.data.user._id,
      name: foundaccount.data.user.name,
      role: foundaccount.data.user.role,
    }
    await localStorage.setItem('userId', savingData.id)
    await localStorage.setItem('userName', savingData.name)
    await localStorage.setItem('userRole', savingData.role)
  }
  return foundaccount.data
}

const checkSessionAgain = async (userData) => {
  const foundaccount = await axios.post('/api/account/findAccount', userData)
  if(foundaccount.data) {
    let savingData = {
      id: foundaccount.data.user._id,
      name: foundaccount.data.user.name,
      role: foundaccount.data.user.role,
      image: foundaccount.data.user.image,
    }
    await localStorage.setItem('userId', savingData.id)
    await localStorage.setItem('userName', savingData.name)
    await localStorage.setItem('userRole', savingData.role)
    await localStorage.setItem('userImage', savingData.image)
  }

  return foundaccount.data
}


// Logout
const logout = async () => {
  await signOut()
  await localStorage.clear()
}

// Register
const register = async (userData) => {
  const request = await axios.post('/api/account/register', userData)
  if(request.data) {
    const authSignIn = await signIn('credentials', {
      redirect: false,
      email: userData.email,
      password: userData.password,
      callbackUrl: `${window.location.origin}`
    })
    await localStorage.setItem('user', request.data.user)
    if(localStorage.user) {
      redirect('/')

    }
  }
  return request.data
}
// passwordReset

const authService = {
  checkSession,
  checkSessionAgain,
  logout,
  register
}

export default authService