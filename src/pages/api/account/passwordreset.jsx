import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
import * as crypto from 'crypto'
import { sendEmail } from "../../../../util/sendEmail";
import bcrypt from 'bcrypt'
import { ResetPasswordEmail } from "./emails";

export default async function PasswordReset(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT' })
  }
  
  const { password, token } = req.body
  
  const emailContent = ResetPasswordEmail(process.env.APP_URL)
  
  if(!token || !password) {
    return res.status(403).json({ success: false, error: 'no token or no password found in the request'})
  }
  
  const resetPasswordToken = await crypto.createHash('sha256').update(token).digest('hex')
  const hashedPasword = await bcrypt.hash(password, 12)
  
  try {
    await dbConnect()
    const user = await User.findOne({resetPasswordToken: resetPasswordToken, resetPasswordExpire: {$gt: Date.now()}})
    
    if(!user) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Token or Token has been expired'
      })
    } else {
      user.password = hashedPasword
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      
      await user.save()

      let emailOptions = {
        from: 'noreply@ykstudio.dev',
        to: user.email,
        subject: 'Password has been changed',
        html: emailContent
      }

      try {
        await sendEmail(emailOptions)
        res.status(203).json({
          success: true,
          message: 'Password changed successfully',
          user: user
        })
      } catch (e) {
        return res.status(400).json({
          success: false,
          message: 'Error at sending out email'
        })
      }
    }
    
  } catch (e) {
    res.status(400).json({
      success: false,
      message: 'Error found on connecting to DB'
    })
  }
}