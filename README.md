## Next.js Auth Template

First, install dependencies;
at this moment, nextauth and @next-auth/mongodb-adapter libraries causing error, still the template has 0 vulnerabilities, the app runs perfectly.

If any libraries added to this template, --force command is needed.

```bash
npm i --force

```

to start the app in localhost, 

```bash
npm run dev
```

### Installed libraries

This template is built for a starting point of an any app to build in YK Studio. Using Next.js 13, TailwindCSS, FramerMotion, MongoDB, and Redux would provide our client the most modern and advanced technologies.

However, nextauth library is not uptodate for latest version of Next.js; We must use Next.js version of 13.2.4 for full functionality.

### Pre-Built functionality
 
- Oauth: google
- auth: email, password
- Headers for horizontal
- Headers for vertical (Dashboard page)
- Landing page
- DashBoard page
- Login/Register Page, login/logout function, reset password function
- aleart modals
- TailwindCSS
- MongoDB
- nodemailer
- Redux: user, error, loading, cart

#### installed libraries are following;

```bash
@next-auth/mongodb-adaper: 1.1.1
axios: 1.3.4
bcryptjs: 2.4.3
bcrypt: 5.1.0
eslint: 8.35.0
eslint-config-next: 13.2.4
framer-motion: 10.2.4
mongodb: 5.1.0
mongoose: 7.0.1
next: 13.2.4
next-auth: 4.20.1
tailwindcss: 3.2.7
nodemailer: 6.9.1
react-redux: 8.0.5
```

#### ENV Setting

For initial setup for this template, set up followings for .env requirements.

```bash
GOOGLE_CLIENT =
GOOGLE_SERCRET =
DATABASE_URL =
NEXTAUTH_JWT =
NEXTAUTH_SECRET =
EMAIL_ACCT =
EMAIL_PW =
APP_URL =
```

- Google Auth address
- MongoDB url
- Email address and password
- NextAuth jwt and secret, use terminal to generate random key
```bash
openssl rand -base64 32
```
