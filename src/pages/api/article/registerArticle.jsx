import dbConnect from "../../../../util/DBConnect";
import Article from "../../../../model/Article";
import Tag from "../../../../model/Tag";

export default async function RegisterArticle(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST'})
  }

  const { title, article, category, subCategory, tag } = req.body

  if(title === '' || article === '' || category === '' || subCategory === '' || !title || !article || !category || !subCategory || tag.length === 0) {
    return res.status(400).json({
      sucess: false,
      message: 'Please fill out all forms'
    })
  }

  dbConnect()

  try {
    let tempTags= []
    if(tag.length > 0) {
      tag.forEach( async subject => {
        let foundTag = await Tag.findOne({tag: subject.tag})
        if(foundTag == null) {
          let newTag = await Tag.create({
            tag: subject.tag,
            addedCount: 1
          })
          if (newTag) {
            await tempTags.push(newTag._id)
            await requestedArticle()
          } else {
            return res.status(400).json({
              success: false,
              message: 'Error found at registering Tag'
            })
          }
        } else {
          let newCount = foundTag.addedCount + 1
          let newTag = await Tag.findOneAndUpdate({tag: subject.tag}, {addedCount: newCount})
          if(newTag) {
            await tempTags.push(newTag._id)
            await requestedArticle()
          } else {
            return res.status(400).json({
              success: false,
              message: 'Error found at registering Tag'
            })
          }
        }
      })
    } 

    // API call
    const requestedArticle = async () => {
      let newArticle = await Article.create({
        title: title,
        article: article,
        category: category,
        subCategory: subCategory,
        tags: tempTags,
      })

      if(newArticle) {
        res.status(200).json({
          success: true,
          message: 'Article has been registered',
          data: newArticle
        })
      } else {
        res.status(400).json({
          success: false,
          message: 'Error found at registering article.'
        })
      }
    }

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }
}