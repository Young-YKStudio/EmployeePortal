import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

const LinkModule = ({category, isNarrow}) => {

  const [ isListOpen, setIsListOpen ] = useState(false)
  const [ revisedCategory, setRevisedCategory ] = useState()
  
  const textShortener = (string) => {
    let initialLetter = string.charAt(0)
    let finalString = initialLetter + '..'
    return finalString
  }
  
  useEffect(() => {
    let tempSubCategoryArry = []
    if(category.subCategory.length >= 2) {
      category.subCategory.forEach((subCategory) => {
        let duplicateSub = tempSubCategoryArry.find((sub) => sub.subCategory === subCategory.subCategory)
        if(!duplicateSub) {
          tempSubCategoryArry.push(subCategory)
        }
      })
      category.subCategory = tempSubCategoryArry
      setRevisedCategory(category)
    } else{
      setRevisedCategory(category)
    }

  },[category])

  return (
    <div>
      {revisedCategory && console.log(revisedCategory)}
      {revisedCategory && 
        <div>
          <div 
            className='flex items-center rounded-md p-1 mb-0.5'
            
          >
            {isListOpen ? 
              <div onClick={() => setIsListOpen(!isListOpen)}
                className='hover:cursor-pointer'
              >
                <MdKeyboardArrowDown className='w-4 h-4 mr-1' />
              </div> 
            : 
              <div onClick={() => setIsListOpen(!isListOpen)}
                className='hover:cursor-pointer'
              >
                <MdKeyboardArrowRight className='w-4 h-4 mr-1' />
              </div>
            }
            <NextLink 
              href={`/dashboard/category/${revisedCategory.category}`}
              className='truncate'
            >
              {isNarrow ? textShortener(revisedCategory.category) : revisedCategory.category}
            </NextLink>
          </div>
          {isListOpen && <div
              className='ml-7 overflow-x-hidden flex flex-col gap-1'
            >
              {revisedCategory.subCategory.map((subCategory) => {
                return <NextLink
                  key={subCategory._id}
                  href={`/dashboard/subCategory/${subCategory.subCategory}`}
                  className='truncate'
                >
                  {isNarrow ? textShortener(subCategory.subCategory) : '- ' + subCategory.subCategory}
                </NextLink>
              })}
            </div>
          }
        </div>
      }
    </div>
  );
}
export default LinkModule;