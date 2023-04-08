import dbConnect from "../../../../util/DBConnect";
import Article from "../../../../model/Article";
import Category from '../../../../model/Category'

export default async function SearchResponse(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET' })
  }

  try {
    dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at accessing DB'
    })
  }
  
  let foundArticles = null
  // get all article
  const getAllArticle = async () => {
    try {
      foundArticles = await Article.find().populate({path:'category', model: Category})
      return foundArticles
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error found at finding articles'
      })
    }
  }
  
  // response with an object
  const run = async () => {
    await getAllArticle()
    console.log(foundArticles, 'api')
    return res.status(200).json({
      success: true,
      articles: foundArticles
    })
  }

  run()
}