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
    await sessionStorage.setItem('userId', savingData.id)
    await sessionStorage.setItem('userName', savingData.name)
    await sessionStorage.setItem('userRole', savingData.role)
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
    await sessionStorage.setItem('userId', savingData.id)
    await sessionStorage.setItem('userName', savingData.name)
    await sessionStorage.setItem('userRole', savingData.role)
    await sessionStorage.setItem('userImage', savingData.image)
  }

  return foundaccount.data
}


// Logout
const logout = async () => {
  await signOut()
  await sessionStorage.clear()
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
    await sessionStorage.setItem('user', request.data.user)
    if(sessionStorage.user) {
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