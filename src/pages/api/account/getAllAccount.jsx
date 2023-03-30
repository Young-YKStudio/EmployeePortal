import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'

export default async function GetAllAccount(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }

  try {
    await dbConnect()
    const users = await User.find({})

    console.log(users, 'at api')

    if(users) {
      res.json({
        success: true,
        users: users,
      })
    } else {
      res.json({
        success: false,
        message: 'user not found in DB'
      })
    }

  } catch (e) {
    res.json({
      success: false, 
      message: 'Error occured during connecting to DB'
    })
  }
}