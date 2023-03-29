import { MongoClient } from 'mongodb'

if (!process.env.DATABASE_URL) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

let client
let clientPromise = MongoClient

const uri = process.env.DATABASE_URL
const options = {}

client = new MongoClient(uri, options)
clientPromise = client.connect()

export default clientPromise