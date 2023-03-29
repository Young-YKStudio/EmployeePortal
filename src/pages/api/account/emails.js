export const ForgotPasswordEmail = (resetUrl) => {
  return `
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body style="
    font-family: 'Inter', sans-serif;
    padding: 2em 2em;
    background-color: #7B68EE;
    color: white;
  ">
    <div style="border-bottom: 2px solid white;">
      <h1 style="font-size: 1.5em">Password Reset Request</h1>
    </div>
    <div style="font-size: .75em; margin: 2em 0;">
      <p>You have reqeusted resetting the password.</p>
      <p>Please click below link to reset your password.</p>
    </div>
    <div style="
      width: 100%;
      height: 3em;
      margin: 1em 0;
      border-radius: 10px;
    ">
      <a href="${resetUrl}" clicktrackin=off style="color: white;">Reset Password</a>
    </div>
  </body>
  `
}

export const ResetPasswordEmail = (homeURL) => {
  return `
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  </head>
  <body style="
    font-family: 'Inter', sans-serif;
    padding: 2em 2em;
    background-color: #7B68EE;
    color: white;
  ">
    <div style="border-bottom: 2px solid white;">
      <h1 style="font-size: 1.5em">Password Reset Successful</h1>
    </div>
    <div style="font-size: .75em; margin: 2em 0;">
      <p>Your password has been updated successfully.</p>
      <p>Please confirm this request is yours, if not, please change your password immediately.</p>
    </div>
    <div style="
      width: 100%;
      height: 3em;
      margin: 1em 0;
      border-radius: 10px;
    ">
      <a href="${homeURL}" clicktrackin=off style="color: white;">Visit Website</a>
    </div>
  </body>
  `
}