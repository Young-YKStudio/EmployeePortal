import dbConnect from "../../../../util/DBConnect";
import Article from "../../../../model/Article";
import Tag from "../../../../model/Tag";
import Category from "../../../../model/Category";
import SubCategory from "../../../../model/SubCategory";

export default async function RegisterArticle(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST'})
  }

  const { title, article, category, subCategory, tag } = req.body

  if(title === '' || article === '' || category === '' || subCategory === '' || !title || !article || !category || !subCategory || tag.length === 0 ||!tag) {
    return res.status(400).json({
      sucess: false,
      message: 'Please fill out all forms'
    })
  }

  dbConnect()

  try {
    let tempTags= []
    let tempCategory = null
    let tempSubCategory = null
    let tempArticle = null

    // 1. Article create
    const registerArticle = async () => {
      try {
        tempArticle = await Article.create({
          title: title,
          article: article,
        })
        return tempArticle
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at registering Article'
        })
      }
    }
    
    // 2. Tag create
    const registerTags = async () => {
      tag.forEach( async subject => {
        let foundTag = await Tag.findOne({tag: subject.tag})
        if(foundTag == null) {
          try {
            let newTag = await Tag.create({
              tag: subject.tag,
              addedCount: 1
            })
            await newTag.articles.push(tempArticle._id)
            await newTag.save()
            return tempTags.push(newTag)
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: 'Error found at registering Tag'
            })
          }
        } else {
          try {
            let newCount = foundTag.addedCount + 1
            let newTag = await Tag.findOneAndUpdate({tag: subject.tag}, {addedCount: newCount})
            await newTag.articles.push(tempArticle._id)
            await newTag.save()
            return tempTags.push(newTag)
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: 'Error found at registering Tag'
            })
          }
        }
      })
    }

    // 3. subCategory create -- done
    async function registerSubCategory() {
      try {
        let foundSubCategory = await SubCategory.findOne({subCategory: subCategory})
        if (foundSubCategory) {
          try {
            await foundSubCategory.articles.push(tempArticle._id);
            await foundSubCategory.save()
            tempSubCategory = foundSubCategory;
            return tempSubCategory;
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: 'Error found at updating SubCategory'
            });
          }
        } else {
          try {
            tempSubCategory = await SubCategory.create({
              subCategory: subCategory,
            });
            await tempSubCategory.articles.push(tempArticle._id);
            await tempSubCategory.save();
            return tempSubCategory;
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: 'Error found at registering SubCategory'
            });
          }
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at finding SubCategory from DB'
        });
      }
    }
    
    // 4. Category create -- done
    const registerCategory = async () => {
      try {
        let foundCategory = await Category.findOne({category: category})
        if(foundCategory == null) {
          try {
            tempCategory = await Category.create({
              category: category,
            })
            await tempCategory.subCategory.push(tempSubCategory._id)
            await tempCategory.articles.push(tempArticle._id)
            await tempArticle.save()
            return tempCategory
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: 'Error found at registering Category'
            })
          }
        } else {
          try {
            await foundCategory.subCategory.push(tempSubCategory._id)
            await foundCategory.articles.push(tempArticle._id)
            await foundCategory.save()
            tempCategory = foundCategory
            return tempCategory
          } catch (error) {
            return res.status(400).json({
              success: false,
              message: 'Error found at updating Category'
            })
          }
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at finding Category from DB'
        })
      }
    }
    
    // 5.  add category in subCateogry

    const EditSubCategory = async () => {
      try {
        tempSubCategory.category = tempCategory._id
        tempSubCategory.save()
        return tempSubCategory
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at modifying subCategory from DB'
        })
      }
    }

    const EditArticle = async () => {
      try {
        tempTags.map(async (tag) => {
          await tempArticle.tags.push(tag._id)
        })
        tempArticle.category = tempCategory._id
        tempArticle.subCategory = tempCategory._id
        tempArticle.save()
        return tempArticle
      } catch(error) {
        return res.status(400).json({
          success: false,
          message: 'Error found at modifying article'
        })
      }
    }
    
    const run = async () => {
      await registerArticle()
      await registerTags()
      await registerSubCategory()
      await registerCategory()
      await EditSubCategory() 
      await EditArticle()
      return res.status(200).json({
        success: true,
        message: 'Article has been registered',
        article: tempArticle
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