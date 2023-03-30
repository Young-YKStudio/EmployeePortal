import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  comment: {
    type: String,
    require: true,
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
  },
  // USER
},{timestamps: true})

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentSchema)

export default Comment