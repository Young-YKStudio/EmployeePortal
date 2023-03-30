import { useState } from 'react'
import { formatPhoneNumber } from '@/formatter/formatter'
import axios from 'axios'
import { toast } from 'react-toastify'
import Router from 'next/router'

const AddEmployee = ({isAddEmployeeOpen, setIsAddEmployeeOpen}) => {

  const [ submitForm, setSubmitForm ] = useState({
    name: '',
    email: '',
    role: '',
    title: '',
  })
  const [ contact, setContact ] = useState('')

  const { name, email, role, title } = submitForm

  const changeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const phoneNumHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setContact(formattedPhoneNumber)
  }

  const closeHandler = () => {
    setIsAddEmployeeOpen(!isAddEmployeeOpen)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    let sendingData = {
      name: name,
      email: email,
      password: 'tempPW',
      contact: contact,
      title: title,
      role: role
    }

    try {
      // turn Loading On
      const request = await axios.post('/api/account/addEmployee', sendingData)

      if(request.data.success) {
        // turn Loading off
        toast.success(request.data.message)
        setIsAddEmployeeOpen(false)
        Router.reload()
      }

    } catch (error) {
      // turn loading off
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="fixed top-0 w-full h-full bg-white/70 z-50 flex justify-center items-center text-white">
      <div className="bg-indigo-900 rounded-md shadow-lg p-12 w-[448px] flex flex-col">
        <div className="border-b border-white pb-2">
          <p className="font-bold text-xl">Add employee</p>
        </div>
        <form
          className='w-full flex flex-col mt-8 gap-4 text-xs'
          onSubmit={(e) => submitHandler(e)}
        >
          <div className='w-full flex flex-col'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' value={name} onChange={changeHandler}
              className='rounded-md border-white text-indigo-900'
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={email} onChange={changeHandler}
              className='rounded-md border-white text-indigo-900'
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='contact'>Contact Number</label>
            <input type='text' name='contact' value={contact} onChange={phoneNumHandler}
              className='rounded-md border-white text-indigo-900'
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='title'>Department | Title</label>
            <select name='title' value={title} onChange={changeHandler} className='text-indigo-900 rounded-md border-white'>
              <option value='' defaultValue='' disabled hidden>Choose Title</option>
              <optgroup label='Accounts'>
                <option value='Accounts - Bookkeeping'>Accounts - Bookkeeping</option>
                <option value='Accounts - AR'>Accounts - AR</option>
                <option value='Accounts - AP'>Accounts - AP</option>
              </optgroup>
              <optgroup label='Sales'>
                <option value='Sales - Sales Representative'>Sales - Sales Representative</option>
                <option value='Sales - Sales Manager'>Sales - Sales Manager</option>
                <option value='Sales - Regional Manager'>Sales - Regional Manager</option>
              </optgroup>
              <optgroup label='Design'>
                <option value='Design - Junior UI/UX Designer'>Design - Junior UI/UX Designer</option>
                <option value='Design - Senior UI/UX Designer'>Design - Senior UI/UX Designer</option>
                <option value='Design - Junior Graphic Designer'>Design - Junior Graphic Designer</option>
                <option value='Design - Senior Graphic Designer'>Design - Senior Graphic Designer</option>
                <option value='Design - Art Director'>Design - Art Director</option>
              </optgroup>
              <optgroup label='Development'>
                <option value='Development - Junior Frontend'>Development - Junior Frontend</option>
                <option value='Development - Senior Frontend'>Development - Senior Frontend</option>
                <option value='Development - Junior Backend'>Development - Junior Backend</option>
                <option value='Development - Senior Backend'>Development - Senior Backend</option>
                <option value='Development - Project Manager'>Development - Project Manager</option>
              </optgroup>
              <optgroup label='Marketing'>
                <option value='Marketing - Consultant'>Marketing - Consultant</option>
                <option value='Marketing - Online coordinator'>Marketing - Online coordinator</option>
                <option value='Marketing - Social Media Specialist'>Marketing - Social Media Specialist</option>
                <option value='Marketing - Marketing Manager'>Marketing - Marketing Manager</option>
              </optgroup>
              <optgroup label='Human Resources'>
                <option value='HR - HR Representative'>HR - HR Representative</option>
                <option value='HR - HR Recruiter<'>HR - HR Recruiter</option>
                <option value='HR - HR Administrator'>HR - HR Administrator</option>
                <option value='HR - HR Manager'>HR - HR Manager</option>
              </optgroup>
              <optgroup label='Management'>
                <option value='Management - Shareholder'>Management - Shareholder</option>
                <option value='Management - CMO'>Management - CMO</option>
                <option value='Management - CTO'>Management - CTO</option>
                <option value='Management - COO'>Management - COO</option>
                <option value='Management - CFO'>Management - CFO</option>
                <option value='Management - CEO'>Management - CEO</option>
              </optgroup>
            </select>
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='role'>Role</label>
            <select value={role} name='role' onChange={changeHandler} className='text-indigo-900 rounded-md border-white'>
              <option value='' disabled defaultValue='' hidden>Choose Role</option>
              <option value='user'>User</option>
              <option value='employee'>Employee</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
          <div className='flex flex-col text-base gap-2'>
            <button className='bg-indigo-400 rounded-md py-2 border border-indigo-400 hover:bg-indigo-600 hover:border-indigo-600' type='submit'>Add</button>
            <button className='border border-indigo-400 rounded-md py-2 hover:bg-indigo-400' onClick={closeHandler}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddEmployee;