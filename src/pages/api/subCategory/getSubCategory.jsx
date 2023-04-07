import dbConnect from "../../../../util/DBConnect";
import SubCategory from "../../../../model/SubCategory";
import Article from "../../../../model/Article";

const validateForm = async (id) => {
  if(!id) {
    return {
      error: 'ID is missing',
      message: 'Cannot locate subCategory, contact service'
    }
  }

  await dbConnect()

  try {
    const foundSubCategory = await SubCategory.findOne({subCategory: id}).populate({path: 'articles', model: Article})
    return foundSubCategory
  } catch (error) {
    return {
      error: 'SubCategory not found',
      message: 'SubCategory is not found in database. Please contact service'
    }
  }
}

export default async function GetSubCategory(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST' })
  }

  const { id } = req.body
  const response = await validateForm(id)

  if(!!response.error) {
    return res.status(400).json({
      success: false,
      error: response.error,
      message: response.message
    })
  } else {
    return res.status(200).json({
      success: true,
      subCategory: response
    })
  }
}