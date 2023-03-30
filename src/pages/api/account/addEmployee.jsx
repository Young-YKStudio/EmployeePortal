import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'
import bcrypt from 'bcrypt'

const validateForm = async (name, email, password, contact, title, role) => {

  if(!name || !email || !password || !contact || title === '' || role === '') {
    return {
      error: 'Required information missing',
      message: 'Required information is missing. Please fill out all forms.'
    }
  }
  
  await dbConnect()
  
  const emailUser = await User.findOne({ email: email })
  
  if(emailUser) {
    return {
      error: 'Email already exist',
      message: 'Entered email already exist. Please try with different email address'
    }
  }
  
  if(password.length < 5) {
    return {
      error: 'Password too short',
      message: 'Password must have 5 or more characters'
    }
  }

  return null
}

export default async function AddEmployee(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST'})
  }

  const { name, email, password, contact, title, role } = req.body

  const errorMessage = await validateForm(name, email, password, contact, title, role)

  if(!!errorMessage) {
    return res.status(400).json({
      success: false,
      error: errorMessage.error,
      message: errorMessage.message
    })
  }

  const hashedPasword = await bcrypt.hash(password, 12)

  try {

    const userRegister = await new User({
      name: name,
      email: email,
      password: hashedPasword,
      contact: contact,
      title: title,
      role: role
    })

    await userRegister.save()

    if(!!userRegister) {
      res.status(200).json({
        success: true,
        message: 'Employee has been added',
        user: userRegister
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Error at registering to DB'
      })
    }

  } catch (error) {
    console.log(error, 'error')
    res.status(400).json({
      success: false,
      message: 'Error at registering account.'
    })
  }
}