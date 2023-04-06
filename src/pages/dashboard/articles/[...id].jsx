import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import moment from 'moment'
import { MdKeyboardArrowRight } from 'react-icons/md'

const Article = (props) => {

  const [ article, setArticle ] = useState()
  
  useEffect(() => {
    let isMounted = true
    let sendingData = {
      id: props.id
    }
    const callAPI = async () => {
      if(isMounted) {
        try {
          const request = await axios.post(`${process.env.APP_URL}/api/article/getArticle`, sendingData)
          
          if(request.data.success) {
            setArticle(request.data.article)
          }
        } catch (e) {
          toast.error(e.response.data.message)
        }
      }
    }
    
    callAPI()
    
    return () => {
      isMounted = false
    }
  },[props])
  
  console.log(article, 'at app')
  return (
    <session className='p-8 pl-20'>
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
          <div className='flex flex-row text-sm mb-4'>
            <p className='flex flex-row items-center'>{article.category}<MdKeyboardArrowRight /></p>
            <p>{article.subCategory}</p>
          </div>
          <div className='flex flex-row border-b border-indigo-900 pb-2'>
            {article.tags.length > 0 && article.tags.map((tag) => {
              return <div
                key={tag._id}
                className='px-2 py-1 rounded-full border border-indigo-900 hover:text-white hover:bg-indigo-900 hover:cursor-pointer text-indigo-900 text-xs mr-1'
              >
                <p>{tag.tag}</p>
              </div>
            })}
          </div>
          <div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className='prose prose-indigo bg-white py-4 rounded-lg'
            >
              {article.article}
            </ReactMarkdown>
          </div>
        </div>
      }
    </session>
  );
}
export default Article;

export async function getServerSideProps(context) {
  const id = context.params.id[0]

  return { props: {id: id} }
}
