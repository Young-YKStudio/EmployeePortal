import { useState } from 'react'
import NextLink from 'next/link'
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md'

const LinkModule = ({category, isNarrow}) => {

  const [ isListOpen, setIsListOpen ] = useState(false)

  console.log(category, 'at child')

  const textShortener = (string) => {
    let initialLetter = string.charAt(0)
    let finalString = initialLetter + '...'
    console.log(finalString, 'at function')
    return finalString
  }

  return (
    <div>
      {category && 
        <div>
          <div 
            className='flex items-center rounded-md p-1 hover:bg-indigo-400'
            onClick={() => setIsListOpen(!isListOpen)}
          >
            {isListOpen ? <MdKeyboardArrowDown className='w-4 h-4' /> : <MdKeyboardArrowRight className='w-4 h-4' />}
            <NextLink 
              href={`/dashboard/category/${category.category}`}
              className='truncate'
            >
              {isNarrow ? textShortener(category.category) : category.category}
            </NextLink>
          </div>
          {isListOpen && <div>
              {category.subCategory.map((subCategory) => {
                return <NextLink
                  key={subCategory._id}
                  href={`/dashboard/subCategory/${subCategory.subCategory}`}
                >
                  {isNarrow ? textShortener(subCategory.subCategory) : subCategory.subCategory}
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