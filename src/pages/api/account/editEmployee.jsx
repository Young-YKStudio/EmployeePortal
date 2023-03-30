import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";

const validateForm = async (id) => {
  if(!id) {
    return {
      error: "ID is missing",
      message: 'Cannot locate user id, contact service.'
    }
  }

  await dbConnect()

  const foundUser = await User.findOne({ _id: id })

  if(!foundUser) {
    return {
      error: 'User not found',
      message: 'User is not found in database. Please contact service.'
    }
  }

  return null
}

export default async function EditEmployee(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT' })
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
    const updateUser = await User.findByIdAndUpdate({_id:id},{
      name: name,
      email: email,
      contact: contact,
      title: title,
      role: role
    })
    if(!!updateUser) {
      res.status(200).json({
        success: true,
        message: 'Employee has been edited',
        user: updateUser
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Error at updating to DB'
      })
    }
  } catch (error) {
    console.log(error, 'error')
    res.status(400).json({
      success: false,
      message: 'Error at updating account'
    })
  }
}