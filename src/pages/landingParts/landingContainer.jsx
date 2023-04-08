import axios from 'axios'
import { useRouter } from "next/router"
import BackgroundCircle from "@/components/background/backgroundCircle"
import { useState } from 'react'
import moment from 'moment'
import { motion } from 'framer-motion'
import Router from 'next/router'

const LandingContainer = () => {
  const { pathname } = useRouter()
  const [ searchedText, setSearchedText ] = useState('')
  const [ results, setResults ] = useState()
  const [ fetchedArticles, setFetchedArticles ] = useState()

  const changeHandler = async (e) => {
    let searchedValue = e.target.value
    setSearchedText(searchedValue)
    let output = {
      article: [],
      category: [],
    }
    const findArticles = () => {
      if(searchedValue ==='') {
        return output = {article: [], category: []}
      } else {
        fetchedArticles.map(async (article) => {
          let titleLowerCase = article.title.toLowerCase()
          if(titleLowerCase.includes(searchedValue.toLowerCase())) {
            await output.article.push(article)
          }
          if(article.category.category.toLowerCase().includes(searchedValue.toLowerCase())) {
            await output.category.push(article)
          }
        })
      }
    }

    if(fetchedArticles) {
      await findArticles()
      setResults(output)
    }
  }
  
  const focusHandler = async () => {
    if(fetchedArticles) {
      return
    } else {
      try {
        const request = await axios.get(`${process.env.APP_URL}/api/search/SearchResponse`)
        if(request.data.success) {
          setFetchedArticles(request.data.articles)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const linkHandler = (e, link) => {
    e.preventDefault()
    Router.push(`/dashboard/articles/${link}`)
  }

  return (
    <div>
      <BackgroundCircle />
      <div className="w-screen h-screen flex flex-col justify-center items-center">

        <div className="text-3xl tracking-tight font-bold text-indigo-900 sm:text-4xl">
          <h2>Search guides for your codes.</h2>
        </div>

        <div className="mt-3 text-lg leading-8 text-indigo-700">
          <p>Find company guides, pre-coded components, and more.</p>
        </div>

        <form
          className='flex flex-col w-full sm:max-w-lg px-8 gap-4 mt-12 text-indigo-900'
        >
          <input 
            value={searchedText} 
            onChange={(e) => changeHandler(e)} 
            placeholder='Search here...'
            className="flex-auto rounded-md border border-indigo-50 bg-white/5 px-8 py-2 shadow-sm w-full"
            onFocus={focusHandler}
          />
          {searchedText !== '' && !results ? 
            <div className='flex justify-center w-full bg-slate-100 rounded-md shadow-lg text-xs py-4'>
              <p>Loading...</p>
            </div> 
            : 
            null
          }
          {results ? <div className='flex flex-col w-full bg-slate-100 rounded-md shadow-lg text-xs px-8'>
            {results.article.length >= 1 && <p
                className='text-sm border-b border-indigo-400 mb-2 py-1 italic pt-4'
              >
                by Title
              </p>
            }
            {results.article.length >= 1 &&
              results.article.map((obj) => {
                return <motion.div
                  className='flex items-center justify-between p-2 hover:cursor-pointer hover:bg-white/50 rounded-xl'
                  whileHover={{ scale: 1.02 }}
                  whilteTap={{ scale: 0.95 }}
                  onClick={(e) => linkHandler(e, obj._id)}
                >
                  <p className='text-sm font-bold truncate'>{obj.title}</p>
                  <p>{moment(obj.createdAt).format('LLL')}</p>
                </motion.div>
              })
            }
            {results.category.length >= 1 && <p
                className='text-sm border-b border-indigo-400 mb-2 py-1 italic pt-4'
              >
                by Category
              </p>
            }
            {results.category.length >= 1 && <div className='mb-4'>
              {
                results.category.map((obj) => {
                  return <motion.div
                    className='flex items-center justify-between p-2 hover:cursor-pointer hover:bg-white/50 rounded-xl'
                    whileHover={{ scale: 1.02 }}
                    whilteTap={{ scale: 0.95 }}
                    onClick={(e) => linkHandler(e, obj._id)}
                  >
                    <p className='text-sm font-bold truncate'>{obj.title}</p>
                    <p>{moment(obj.createdAt).format('LLL')}</p>
                  </motion.div>
                })
              }
            </div>
            }
          </div>
          :
          null
          }
        </form>
      </div>
    </div>
  );
}
export default LandingContainer;