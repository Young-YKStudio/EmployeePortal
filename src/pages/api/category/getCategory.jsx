import dbConnect from "../../../../util/DBConnect";
import Category from "../../../../model/Category";
import Article from '../../../../model/Article'

const validateForm = async (id) => {
  if(!id) {
    return {
      error: 'ID is missing',
      message: 'Cannot locate category, contact service.'
    }
  }

  await dbConnect()

  try {
    const foundCategory = await Category.findOne({category: id}).populate({path: 'articles', model: Article})
    return foundCategory
  } catch (error) {
    return {
      error: 'Category not found',
      message: 'Category is not found in database. Please contact service.'
    }
  }
}

export default async function GetCategory(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST' })
  }

  const { id } = req.body

  const response = await validateForm(id)

  if(!response) {
    return res.status(400).json({
      success: false,
      error: response.error,
      message: response.message
    })
  } else {
    return res.status(200).json({
      success: true,
      category: response
    })
  }
}