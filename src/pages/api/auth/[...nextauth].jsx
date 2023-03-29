import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../../util/mongodb"
import dbConnect from "../../../../util/DBConnect"
import User from "../../../../model/User"
import { compare } from 'bcrypt'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_CLIENT}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      },
    }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({
          email: credentials?.email,
        })

        if(!user) {
          throw new Error('Check your email') 
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        )

        if(!passwordMatch) {
          throw new Error('Check your password')
        }

        return user
      }
    })
  ],
  pages: {
    signIn: '/account/login',
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({url, baseUrl}) {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      } else if (new URL(url).origin === baseUrl) {
        return url
      }
      return baseUrl
    }
  }
})