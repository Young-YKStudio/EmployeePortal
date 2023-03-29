
import { getProviders, signIn, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Router from 'next/router';
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux';
import { checkSession, login } from '../../../../redux/cartSlice';

const Login = ({providers}) => {
  
  const [ loginForm, setLoginForm ] = useState({
    email: '',
    password: ''
  })
  
  const { email, password } = loginForm
  const { session, status } = useSession()
  const dispatch = useDispatch()

  const formChangeHandler = (e) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const redirectToRegister = () => {
    Router.push('/account/register')
  }

  const authButton = (obj) => {
    if (obj.name === 'Google') {
      return <button
        className='w-full border-2 border-transparent flex items-center justify-center bg-white py-2 rounded-lg hover:border-indigo-500'
        onClick={() => {
          signIn('google', {
            callbackUrl: '/account/login'
          })
        }}
      >
        <FcGoogle className='w-6 h-6 mr-2' /> Sign in with {obj.name}
      </button>
    }
  }

  const AuthLinks = (providers) => (
    <div className='w-full flex flex-col items-center'>
      { providers && authButton(providers.providers.google)} 
    </div>
  )

  const submitHandler = async () => {
    const userData = {
      email, password
    }

    dispatch(login(userData))
  }

  useEffect(() => {
    if(status === 'authenticated') {
      dispatch(checkSession({email: email}))
      Router.push('/')
    }
  },[status])
  

  return (
    <div className='bg-indigo-100 w-screen h-screen flex justify-center items-center text-indigo-900'>
      <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>
        <div className='flex justify-center border-b border-indigo-300 pb-4 mb-4'>
          <h1 className='font-bold text-2xl'>Login</h1>
        </div>
        {/* AUTH LINK GOES HERE */}
        <AuthLinks providers={providers} />
        {/* divider */}
        <div className='flex w-full justify-center items-center gap-2 my-2'>
          <div className='w-full border-b border-indigo-300'/>
          <div className=''>
            <h1 className='text-xs'>or</h1>
          </div>
          <div className='w-full border-b border-indigo-300'/>
        </div>
        {/* Form Input */}
        <div className='flex flex-col gap-1 text-sm mb-2' >
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='email'>
              Email
            </label>
            <input type='email' value={email} name='email' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='password'>
              Password
            </label>
            <input type='password' value={password} name='password' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
        </div>
        {/* buttons and links */}
        <div className='flex flex-col items-center gap-2 mt-2'>
          <button className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full mb-2' onClick={submitHandler}>Login</button>
          <p className='text-xs'>Don't have an account? <button onClick={() => redirectToRegister()} className='font-bold hover:text-indigo-500'>Register</button></p>
          <p className='text-xs'>Forgot password?<a href='/account/forgotpassword' className='hover:text-indigo-500 font-bold'> Password Reset</a></p>
        </div>
      </div>
    </div>
  );
}
export default Login

export async function getServerSideProps() {
  return {
    props: {
      providers: await getProviders()
    }
  }
}