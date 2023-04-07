import axios from 'axios'
import { useState, useEffect } from 'react'
import NextLink from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice'
import { useDispatch } from 'react-redux'
import LinkModule from './LinkModule'

const CategoryLinks = ({path, isNarrow}) => {

  const [ fetchedCategory, setFetchedCategory ] = useState()
  const dispatch = useDispatch()

  const linkHandler = (id, type) => {
    if(type === 'category') {
      Router.push(`/dashboard/category/${id}`)
    }
    if(type === 'subCategory') {
      Router.push(`/dashboard/subCategory/${id}`)
    }
  }

  useEffect(() => {
    let isMounted = true

    const getCategories = async () => {
      if(isMounted) {
        try {
          dispatch(setLoadingOn())
          const request = await axios.get(`${process.env.APP_URL}/api/headerCall/getCategories`)
          if(request.data.success) {
            setFetchedCategory(request.data.categories)
            dispatch(setLoadingOff())
          }
        } catch (error) {
          dispatch(setLoadingOff())
          toast.error(error.response.data.message)
        }
      }
    }
    getCategories()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section className="w-full h-full overflow-auto text-xs">
      {fetchedCategory && fetchedCategory.map((category) => {
        return <div
          key={category._id}
        >
          <LinkModule category={category} isNarrow={isNarrow}/>
        </div>
      })}
    </section>
  );
}
export default CategoryLinks;