import dbConnect from "../../../../util/DBConnect";
import Article from "../../../../model/Article";
import Tag from "../../../../model/Tag";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

export default async function DeleteArticle(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }
  
  const { id } = req.body
  
  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'ID is missing'
    })
  }
  
  dbConnect()
  
  try {
    let foundArticle = null
    let foundCategory = null
    let foundSubCategory = null
    let tempTags = []
    
    const findArticle = async () => {
      try {
        foundArticle = await Article.findOne({_id: id})
        return foundArticle
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at finding Article'
        })
      }
    }

    const findTagsAndUpdate = async () => {
      foundArticle.tags.forEach(async (tag) => {
        try {
          let foundTag = await Tag.findOne({_id: tag._id}).populate({path: 'articles', model: Article})
          if(foundTag) {
            if(foundTag.articles.length > 1) {
              foundTag.articles.forEach(async (article, index) => {
                if(article._id = foundArticle._id) {
                  foundTag.articles.splice(index, 1)
                  await foundTag.save()
                  tempTags.push(foundTag)
                }
              })
            } else {
              await Tag.findByIdAndRemove({_id: tag._id})
            }
          }
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'Error found at find and update tags'
          })
        }
      })
    }

    const findCategoryAndUpdate = async () => {
      try {
        foundCategory = await Category.findOne({_id: foundArticle.category})
        if(foundCategory) {
          foundCategory.articles.forEach(async (article, index) => {
            if(article = foundArticle._id) {
              foundCategory.articles.splice(index, 1)
              return foundCategory
            }
          })
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at find and update category'
        })
      }
    }
    
    const findSubCategoryAndUpdate = async () => {
      try {
        foundSubCategory = await SubCategory.findOne({_id: foundArticle.subCategory})
        if(foundSubCategory) {
          foundSubCategory.articles.forEach((article, index) => {
            if(article = foundArticle._id) {
              foundSubCategory.articles.splice(index, 1)
              return foundSubCategory
            }
          })
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at find and update subcategory'
        })
      }
    }

    const subCategoryLengthValidate = async () => {
      try {
        if(foundSubCategory.articles.length == 0) {
          await SubCategory.findByIdAndRemove({_id: foundSubCategory._id})
          return foundSubCategory = null
        } 
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at detecting length of subcategory'
        })
      }
    }

    const categoryLengthValidate = async () => {
      try {
        await foundCategory.subCategory.forEach((subCategory, index) => {
          if(subCategory = foundCategory._id) {
            foundCategory.subCategory.splice(index, 1)
            return foundCategory
          }
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at detecting length of category'
        })
      }
    }

    const saveAll = async () => {
      if (foundCategory.articles.length == 0) {
        await Category.findByIdAndRemove({_id: foundCategory._id})
      }

      if (foundCategory.articles.length >= 1) {
        await foundCategory.save()
      }

      if (!!foundSubCategory) {
        await foundSubCategory.save()
      }
    }

    const deleteArticle = async () => {
      try {
        await Article.findByIdAndRemove({_id: foundArticle._id})
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at deleting article'
        })
      }
    }

    const run = async () => {
      await findArticle()
      await findTagsAndUpdate()
      await findCategoryAndUpdate()
      await findSubCategoryAndUpdate()
      await subCategoryLengthValidate()
      await categoryLengthValidate()
      await saveAll()
      await deleteArticle()
      res.status(200).json({
        success: true,
        message: 'Successfuly deleted'
      })
    }

    run()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }

}