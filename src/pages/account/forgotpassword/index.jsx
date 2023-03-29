import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { MdCheckCircle } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

  const [ emailForm, setEmailForm ] = useState({
    email: '',
  })
  const [ success, setSuccess ] = useState(false)

  const { email } = emailForm

  const formChangeHandler = (e) => {
    setEmailForm((prev) => ({...prev, email: e.target.value }))
  }

  const redirectTo = (path) => {
    Router.push(path)
  }

  const submitHandler = async () => {
    // loading
    try {
      const request = await axios.put('/api/account/forgotpassword', emailForm)
      if(request.data.success) {
        toast.success('Email has been sent')
        setSuccess(true)
      }
    } catch (e) {
      return toast.error(`${e.response.data.message}`)
    }
  }

  return (
    <section className='w-screen h-screen bg-indigo-100 flex items-center justify-center text-indigo-900'>
      { success ?
        <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>

          <div className='flex justify-center border-b border-indigo-300 pb-4 mb-4'>
            <h1 className='font-bold text-2xl'>Password Reset</h1>
          </div>

          <div className='flex flex-col justify-center items-center py-12 gap-6 w-full'>

            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <MdCheckCircle className='w-24 h-24 text-green-500' />
              </motion.div>
            </AnimatePresence>

            <div className='text-center flex flex-col gap-2'>
              <p className='font-bold text-xl'>Email has been sent</p>
              <p className='text-xs text-center'>please check your email to reset password</p>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <button 
              className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full'
              onClick={() => redirectTo('/account/login')}
            >
              Go Back
            </button>
          </div>

        </div>
      :
        <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>
          <div className='flex justify-center border-b border-indigo-300 pb-4 mb-4'>
            <h1 className='font-bold text-2xl'>Password Reset</h1>
          </div>

          <div className='flex flex-col gap-1 text-sm mb-2' >

            <div className="text-xs text-center mb-4">
              <p>Please enter the email address you registered.</p>
            </div>

            <div className='flex flex-col gap-1 mb-2'>
              <label htmlFor='email'>
                Email
              </label>
              <input type='email' value={email} name='email' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
            </div>

          </div>

          <div className='flex flex-col items-center gap-4'>
            <button className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full' onClick={submitHandler}>Send Email</button>
            <p className='text-xs'>back to <button onClick={() => redirectTo('/account/login')} className='font-bold hover:text-indigo-500'>login</button></p>
          </div>
        </div>
      }
    </section>
  );
}
export default ForgotPassword;