import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'
import * as crypto from 'crypto'
import { sendEmail } from "../../../../util/sendEmail";
import { ForgotPasswordEmail } from "./emails";

export default async function ForgotPassword(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT' })
  }

  const resetToken = await crypto.randomBytes(20).toString('hex')
  let token = await crypto.createHash('sha256').update(resetToken).digest('hex')
  let expire = await Date.now() + 10 * (60 * 1000)
  const resetUrl = `${process.env.APP_URL}/account/passwordreset/${resetToken}`
  const { email } = req.body

  if(!email) {
    res.json({
      success: false, 
      message: 'Please enter email correctly'
    })
  }

  let emailContent = ForgotPasswordEmail(resetUrl)

  let emailOptions = {
    from: 'noreply@ykstudio.dev',
    to: email,
    subject: 'Password Reset Reqeust for Test',
    html: emailContent
  }

  try {
    await dbConnect()
    const user = await User.findOneAndUpdate({email: email}, {
      resetPasswordToken: token,
      resetPasswordExpire: expire,
    })

    if(user) {
      try {
        await sendEmail(emailOptions)
        res.status(200).json({
          success: true,
          message: 'Email has been sent'
        })
      } catch (e) {
        res.status(503).json({
          success: false, 
          message: 'Error found at sending email'
        })
      }
    } else {
      res.status(400).json({
        success: false,
        message: 'The email address entered is not valid'
      })
    }

  } catch (e) {
    await dbConnect()
    await User.findOneAndUpdate({email: email}, {
      resetPasswordToken: undefined,
      resetPasswordExpire: undefined,
    })
    res.status(400).json({
      success: false,
      message: 'Error occured during connecting to DB or sending out email'
    })
  }
}