import moment from 'moment';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Router from 'next/router'
import { motion } from 'framer-motion'

const DashboardLanding = (props) => {

  const [ allArticles, setAllArticles ] = useState()

  const linkHandler = (id) => {
    Router.push(`/dashboard/articles/${id}`)
  }

  useEffect(() => {
    let isMounted = true

    if(isMounted) {
      const getAllArticles = async () => {
        // TODO: update local address when deploying, Next bug!
        const request = await axios.get(`http://localhost:3000/api/article/getAllArticle`)
        if(request.data) {
          setAllArticles(request.data.articles)
        }
      }
      getAllArticles()
    }
    return () => {
      isMounted = false
    }
  },[])
  return (
    <section className='p-8 bg-indigo-50 w-full'>
      {allArticles && console.log(allArticles)}
      <p>Landing</p>
      <div className='flex flex-col gap-4'>
        {allArticles && allArticles.map((article) => {
          return <motion.div
            key={article._id}
            className='w-full bg-white p-4 rounded-lg shadow-md hover:shadow-none hover:cursor-context-menu'
            onClick={() => linkHandler(article._id)}
            whileHover={{ scale: 1.023 }}
            whileTap={{ scale: 0.99 }}
          >
            <p className='font-bold text-2xl truncate'>{article.title}</p>
            <p className='text-xs text-indigo-400 mb-3'><span className='italic text-indigo-300 mr-2'>posted:</span>{moment(article.createdAt).format('LLL')}</p>
            <div>
              {article.tags.length > 0 && <div
                className='flex flex-row'
              >
                  {article.tags.map((tag) => {
                    return <div
                      key={tag._id}
                      className='px-2 py-0.5 rounded-full border border-indigo-900 hover:text-white hover:bg-indigo-900 hover:cursor-pointer text-indigo-900 text-xs mr-1'
                    >
                      <p>{tag.tag}</p>
                    </div>
                  })}
                </div>
              }
            </div>
          </motion.div>
        })}
      </div>
    </section>
  );
}
export default DashboardLanding;