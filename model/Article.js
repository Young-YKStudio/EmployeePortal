import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  article: {
    type: String,
    require: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  category: {
    type: String,
    require: true,
  },
  subCategory: {
    type: String,
    require: true,
  }
},{timestamps: true})

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema)

export default Article