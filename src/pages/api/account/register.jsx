import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'
import bcrypt from 'bcrypt'

const validateForm = async (username, email, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return {
      error: 'Passwords do no match',
      message: 'Paswords do not match. Please check your password again'
    }
  }

  await dbConnect();

  const emailUser = await User.findOne({ email: email })

  if(emailUser) {
    return {
      error: 'Email already exist',
      message: 'Entered email already exists. Please try with different email address'
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

export default async function registerAccount(req, res) {

  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  const { name, email, password, passwordConfirm } = req.body

  const errorMessage = await validateForm(name, email, password, passwordConfirm)

  if (!!errorMessage) {
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
      password: hashedPasword
    })

    await userRegister.save()

    res.status(200).json({
      success: true,
      message: 'User has been registered',
      user: userRegister
    })

  } catch (e) {
    console.log(e)
    res.status(400).json({
      success: false,
      message: 'Error at registering account'
    })
  }
}