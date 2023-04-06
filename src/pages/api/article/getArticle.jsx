import dbConnect from "../../../../util/DBConnect";
import Article from "../../../../model/Article";
import Tag from "../../../../model/Tag";

const validateForm = async (id) => {
  if(!id) {
    return {
      error: "ID is missing",
      message: 'Cannot locate user id, contact service.'
    }
  }

  await dbConnect()

  try {
    const foundArticle = await Article.findOne({ _id: id }).populate({path: 'tags', model: Tag})
    return foundArticle
  } catch (error) {
    return {
      error: 'Article not found',
      message: 'Article is not found in database. Please contact service.'
    }
  }

}

export default async function GetArticle(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST' })
  }

  console.log(req.body, 'at api')
  const { id } = req.body

  const response = await validateForm(id)

  if(!!response.error) {
    return res.status(400).json({
      success: false,
      error: errorMessage.error,
      message: errorMessage.message
    })
  } else {
    return res.status(200).json({
      success: true,
      article: response
    })
  }

}