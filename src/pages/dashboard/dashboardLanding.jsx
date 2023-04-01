import moment from 'moment';
import axios from 'axios'
import { useEffect, useState } from 'react';

const DashboardLanding = (props) => {

  const [ allArticles, setAllArticles ] = useState()

  useEffect(() => {
    let isMounted = true

    if(isMounted) {
      const getAllArticles = async () => {
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
          return <div
            key={article._id}
            className='w-full bg-white p-4 rounded-lg shadow-md'
          >
            <p className='font-bold text-2xl truncate'>{article.title}</p>
            <p className='text-xs'>{moment(article.createdAt).format('LLL')}</p>
            <div>
              {article.tags.length > 0 && <div
                className='flex flex-row'
              >
                  {article.tags.map((tag) => {
                    return <div
                      key={tag._id}
                      className='px-2 py-1 rounded-full bg-indigo-200 text-indigo-900 text-xs mr-1'
                    >
                      <p>{tag.tag}</p>
                    </div>
                  })}
                </div>
              }
            </div>
          </div>
        })}
      </div>
    </section>
  );
}
export default DashboardLanding;