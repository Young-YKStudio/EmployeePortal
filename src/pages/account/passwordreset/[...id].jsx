import { useRouter } from 'next/router'
import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { toast } from 'react-toastify'

const PasswordReset = () => {

  const router = useRouter()
  let resetToken = router.query

  const [ changePassword, setChangePassword ] = useState({
    password: '',
    passwordConfirm: '',
  })

  const { password, passwordConfirm } = changePassword

  const formChangeHandler = (e) => {
    setChangePassword((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const redirectTo = (path) => {
    Router.push(path)
  }

  const submitHandler = async () => {
    if (password !== passwordConfirm) {
      toast.warn('Please check your passwords')
      return 
    }

    let submitForm = {
      password: password,
      token: resetToken.id[0],
    }

    try {
      const request = await axios.put('/api/account/passwordreset', submitForm)
      if(request.data) {
        console.log(request.data, 'success reqeust')
        // modal for succes 
        toast.success('Password has been reset')
        Router.push('/account/login')
      }
    } catch (e) {
      return toast.error(`${e.response.data.message}`)
    }
  }

  return (
    <section className='w-screen h-screen bg-indigo-100 flex items-center justify-center text-indigo-900'>
      <div className='w-96 p-8 rounded-lg bg-white/40 shadow-lg flex flex-col'>
        <div className='flex justify-center border-b border-indigo-300 pb-4 mb-4'>
          <h1 className='font-bold text-2xl'>Password Reset</h1>
        </div>

        <div className='flex flex-col gap-1 text-sm mb-2' >

          <div className="text-xs text-center mb-4">
            <p>Please enter new password</p>
          </div>

          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='password'>
              Password
            </label>
            <input type='password' value={password} name='password' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>
          <div className='flex flex-col gap-1 mb-2'>
            <label htmlFor='passwordConfirm'>
              Confirm Password
            </label>
            <input type='password' value={passwordConfirm} name='passwordConfirm' className='rounded-md px-4 py-1 border-slate-100' onChange={formChangeHandler}/>
          </div>

        </div>

        <div className='flex flex-col items-center gap-4'>
          <button className='bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 w-full' onClick={submitHandler}>Change Pasword</button>
          <p className='text-xs'>back to <button onClick={() => redirectTo('/account/login')} className='font-bold hover:text-indigo-500'>login</button></p>
        </div>
      </div>
    </section>
  );
}
export default PasswordReset;