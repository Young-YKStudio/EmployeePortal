import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import Router from 'next/router'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

const Tags = (props) => {

  const [ fetchedTags, setFetchedTags ] = useState(false)
  const dispatch = useDispatch()

  const linkHandler = (id) => {
    Router.push(`/dashboard/articles/${id}`)
  }

  useEffect(() => {
    let isMounted = true
    const getTags = async () => {
      if(isMounted) {
        let sendingData = {
          id: props.id
        }
        try {
          dispatch(setLoadingOn())
          const request = await axios.post(`${process.env.APP_URL}/api/tag/getTag`, sendingData)
          if(request.data.success) {
            setFetchedTags(request.data.tag)
            dispatch(setLoadingOff())
          }
        } catch (error) {
          dispatch(seLoadingOff())
          toast.error(error.response.data.message)
        }
      }
    }
    getTags()
    return () => {
      isMounted = false
    }
  },[props])

  return (
    <section className="p-8 pl-20 bg-indigo-50 w-full">
      <p className='text-3xl font-bold text-indigo-900 mb-4'>Tag: {fetchedTags ? fetchedTags.tag : 'Loading...'}</p>
      <div
        className='flex flex-col gap-4 lg:grid lg:grid-cols-2'
      >
        {fetchedTags && fetchedTags.articles.map((article) => {
          return <motion.div
            key={article._id}
            className='w-full bg-white p-4 rounded-lg shadow-md hover:shadow-none hover:cursor-context-menu'
            whileHover={{ scale: 1.023 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => linkHandler(article._id)}
          >
            <p className='font-bold text-2xl truncate'>{article.title}</p>
            <p className='text-xs text-indigo-400'><span className='italic text-indigo-300 mr-2'>posted:</span>{moment(article.createdAt).format('LLL')}</p>
          </motion.div>
        })}
      </div>
    </section>
  );
}
export default Tags;

export async function getServerSideProps(context) {
  const id = context.params.id[0]
  return { props: {id: id}}
}