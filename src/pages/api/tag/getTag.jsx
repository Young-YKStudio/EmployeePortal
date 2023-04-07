import dbConnect from "../../../../util/DBConnect";
import Tag from "../../../../model/Tag";
import Article from "../../../../model/Article";

const validateForm = async (id) => {
  if(!id) {
    return {
      error: 'ID is missing',
      message: 'Cannot locate Tag, contact service'
    }
  }

  await dbConnect()

  try {
    const foundTag = await Tag.findOne({_id: id}).populate({path:'articles', model: Article})
    return foundTag
  } catch (error) {
    return {
      error: 'Tag not found',
      message: 'Tag is not found in database. Please contact service'
    }
  }
}

export default async function GetTag(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST' })
  }

  const { id } = req.body
  const response = await validateForm(id)

  if(!!response.error) {
    return res.status(400).json({
      success: false, 
      error: response.error,
      message: response.message,
    })
  } else {
    return res.status(200).json({
      success: true,
      tag: response
    })
  }
}