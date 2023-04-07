import dbConnect from "../../../../util/DBConnect";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

export default async function GetCategories(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET' })
  }

  const GetAllCategory = async () => {
    try {
      const allCategories = await Category.find().sort({'category': 1}).populate({path: 'subCategory', model: SubCategory})
      return allCategories
    } catch (error) {
      return {
        error: 'Error found at getting categories',
        message: 'Error found at getting categories. Contact Service.'
      }
    }
  }

  const response = await GetAllCategory()

  if(!!response.error) {
    return res.status(400).json({
      success: false,
      error: response.error,
      message: response.message
    })
  } else {
    return res.status(200).json({
      success: true,
      categories: response
    })
  }
}