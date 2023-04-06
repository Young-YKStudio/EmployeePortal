import mongoose from 'mongoose'

const subCategorySchema = new mongoose.Schema({
  subCategory: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article'
    }
  ],
},{timestamps: true})

const SubCategory = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema)

export default SubCategory