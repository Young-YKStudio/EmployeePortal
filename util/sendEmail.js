export const sendEmail = async (options) => {

  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: `${process.env.EMAIL_ACCT}`,
      pass: `${process.env.EMAIL_PW}`
    }
  })

  const mailOptions ={
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html
  }

  try {
    let emailDeliver = await transporter.sendMail(mailOptions)
    console.log(emailDeliver)
  } catch (error) {
    console.log(error)
  }

}

