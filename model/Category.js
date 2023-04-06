import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  category: String,
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory'
    }
  ],
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    }
  ],
},{timestamps: true})

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)

export default Category