import axios from 'axios'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { formatPhoneNumber } from '@/formatter/formatter'

const EditEmployee = ({isEditEmployeeOpen, setIsEditEmployeeOpen, selectedAccount}) => {

  const [ userInfo, setUserInfo ] = useState({
    name: '',
    email: '',
    title: '',
    role: ''
  })
  const [ contact, setContact ] = useState('')

  const { name, email, title, role } = userInfo

  useEffect(() => {
    setUserInfo((prev) => ({
      ...prev,
      name: selectedAccount.name,
      email: selectedAccount.email,
      title: selectedAccount.title ? selectedAccount.title : '',
      role: selectedAccount.role ? selectedAccount.role : '',
    }))
    setContact(selectedAccount.contact ? selectedAccount.contact : '')
  },[selectedAccount])

  const changeHandler = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  } 

  const phoneNumHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setContact(formattedPhoneNumber)
  }

  const editUser = async (e) => {
    e.preventDefault()

    let sendingData = {
      name: name,
      email: email,
      contact: contact,
      title: title,
      role: role,
      id: selectedAccount._id
    }

    try {
      const request = await axios.put('/api/account/editEmployee', sendingData)
      if(request.data.success) {
        setIsEditEmployeeOpen(false)
        await Router.reload()
        toast.success(request.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const deleteUser = async (e) => {
    e.preventDefault()

    let sendingData = {
      name: name,
      email: email,
      contact: contact,
      title: title,
      role: role,
      id: selectedAccount._id
    }

    try {
      const request = await axios.put('/api/account/deleteEmployee', sendingData)

      if(request.data.success) {
        toast.success(request.data.message)
        setIsEditEmployeeOpen(false)
        Router.reload()
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="fixed top-0 w-full h-full bg-white/70 z-50 flex justify-center items-center text-white">
      <div className="bg-indigo-900 rounded-md shadow-lg p-12 w-[448px] flex flex-col">
        <div className="border-b border-white pb-2">
          <p className="font-bold text-xl">Edit Employee</p>
        </div>
        <form
          className='w-full flex flex-col mt-8 gap-4 text-xs'
          onSubmit={editUser}
        >
          <div className='w-full flex flex-col'>
            <label htmlFor='name'>Name</label>
            <input type='text' name='name' value={name} 
              className='rounded-md border-white text-indigo-900' 
              onChange={changeHandler}
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' value={email} 
              className='rounded-md border-white text-indigo-900' 
              onChange={changeHandler}
            />
          </div>
          <div className='w-full flex flex-col'>
            <label htmlFor='contact'>Contact Number</label>
            <input type='text' name='contact' value={contact} 
              className='rounded-md border-white text-indigo-900' 
              onChange={phoneNumHandler}
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
          <div  className='flex flex-col text-base gap-2'>
            <button className='bg-indigo-400 rounded-md py-2 border border-indigo-400 hover:bg-indigo-600 hover:border-indigo-600' type='submit'>Edit</button>
            <button className='border border-indigo-400 rounded-md py-2 hover:bg-indigo-400' onClick={() => setIsEditEmployeeOpen(false)}>Close</button>
            <button onClick={deleteUser} className='border border-red-800 bg-red-800 rounded-md py-2 hover:bg-red-500 hover:border-red-500'>Delete Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditEmployee;