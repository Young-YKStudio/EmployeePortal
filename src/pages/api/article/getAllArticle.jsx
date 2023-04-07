import dbConnect from "../../../../util/DBConnect";
import Article from "../../../../model/Article";
import Tag from "../../../../model/Tag";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

export default async function GetAllArticle(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }
  
  await dbConnect()
  try {
    const articles = await Article.find().sort({createdAt: -1}).populate({path: 'tags', model: Tag}).populate({path: 'category', model: Category}).populate({path: 'subCategory', model: SubCategory})
    if(articles) {
      res.json({
        success: true,
        articles: articles,
      })
    } else {
      res.json({
        success: false,
        message: 'articles not found in DB'
      })
    }
  } catch (error) {
    res.json({
      success: false, 
      message: 'Error occured during connecting to DB'
    })
  }
}