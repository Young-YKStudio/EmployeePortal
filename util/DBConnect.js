import mongoose from 'mongoose'

if (!process.env.DATABASE_URL) {
  throw new Error('Please add your ENV to .env or can\'t location .env')
}

const mongoUri = process.env.DATABASE_URL

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null}
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (mongoose.connection.readyState >= 1) return ;

  if(!cached.promise) {
    const opts = {
      bufferCommands: false
    }

    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect