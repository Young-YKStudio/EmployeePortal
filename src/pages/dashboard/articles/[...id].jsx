import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import { MdKeyboardArrowRight } from 'react-icons/md'
import NextLink from 'next/link'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice'
import Router from 'next/router'

const Article = (props) => {

  const [ article, setArticle ] = useState()
  const dispatch = useDispatch()

  const TagRouting = (id) => {
    Router.push(`/dashboard/tags/${id}`)
  }
  
  useEffect(() => {
    let isMounted = true
    let sendingData = {
      id: props.id
    }
    const callAPI = async () => {
      dispatch(setLoadingOn())
      if(isMounted) {
        try {
          const request = await axios.post(`${process.env.APP_URL}/api/article/getArticle`, sendingData)
          
          if(request.data.success) {
            dispatch(setLoadingOff())
            setArticle(request.data.article)
          }
        } catch (e) {
          dispatch(setLoadingOff())
          toast.error(e.response.data.message)
        }
      }
    }
    
    callAPI()
    
    return () => {
      isMounted = false
    }
  },[props])
  
  return (
    <section className='p-8 pl-20 w-full'>
      {article && <div
        >
          <div>
            <h1 className='text-3xl font-bold'>{article.title}</h1>
          </div>
          <div
            className='mb-4'
          >
            <p className='text-xs'><span className='italic text-slate-600'>posted:</span>{moment(article.createdAt).format('LLL')}</p>
          </div>
          <div className='flex flex-row text-sm mb-4 items-center'>
            <NextLink 
              href={`/dashboard/category/${article.category.category}`}
              className='text-indigo-900 hover:text-indigo-400'
            >
              {article.category.category}
            </NextLink>
            <p><MdKeyboardArrowRight /></p>
            <NextLink
              href={`/dashboard/subCategory/${article.subCategory.subCategory}`}
              className='text-indigo-900 hover:text-indigo-400'
            >
              {article.subCategory.subCategory}
            </NextLink>
          </div>
          <div className='flex flex-row border-b border-indigo-900 pb-4'>
            {article.tags.length > 0 && article.tags.map((tag) => {
              return <div
                key={tag._id}
                className='px-2 py-0.5 rounded-full border border-indigo-900 hover:text-white hover:bg-indigo-900 hover:cursor-pointer text-indigo-900 text-xs mr-1'
                onClick={() => TagRouting(tag._id)}
              >
                <p>{tag.tag}</p>
              </div>
            })}
          </div>
          <div className='w-full'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className='prose prose-indigo bg-white py-4 rounded-lg'
            >
              {article.article}
            </ReactMarkdown>
          </div>
        </div>
      }
    </section>
  );
}
export default Article;

export async function getServerSideProps(context) {
  const id = context.params.id[0]

  return { props: {id: id} }
}
