import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'

export default async function FindAccount(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST'})
  }
  
  const { email, password } = req.body

  try {
    await dbConnect()
    const user = await User.findOne({email: email})

    if(user) {
      res.json({
        success: true,
        user: user,
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