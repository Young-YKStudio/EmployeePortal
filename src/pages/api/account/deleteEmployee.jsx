import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";

const validateForm = async (id) => {

  if(!id) {
    return {
      error: 'ID is missing',
      message: 'Can not locate user id, contact service.'
    }
  }

  await dbConnect()

  const emailUser = await User.findOne({ _id: id })

  if(!emailUser) {
    return {
      error: 'User not found',
      message: 'User is not found in database. Please contact service'
    }
  }

  return null
}

export default async function DeleteEmployee(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { name, email, contact, title, role, id } = req.body

  const errorMessage = await validateForm(id)

  if(!!errorMessage) {
    return res.status(400).json({
      success: false,
      error: errorMessage.error,
      message: errorMessage.message
    })
  }

  try {
    const deleteUser = await User.findByIdAndDelete({ _id: id })
    console.log(deleteUser, 'at api')
    if(!!deleteUser) {
      res.status(200).json({
        success: true,
        message: 'Employee has been deleted'
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Error at deleting employee from database'
      })
    }

  } catch (error) {
    console.log(error, 'error')
    res.status(400).json({
      success: false,
      message: 'Error at deleting account'
    })
  }
}