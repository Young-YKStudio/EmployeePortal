import axios from 'axios'
import { MdEditDocument } from 'react-icons/md'
import NextLink from 'next/link'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoadingOff, setLoadingOn } from '../../../../redux/cartSlice'
import Router from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ManagePosts = (props) => {
  
  const dispatch = useDispatch()
  
  const editHandler = async (e, id) => {

    let sendingData = {
      id: id
    }

    try {
      dispatch(setLoadingOn())
      const request = await axios.put(`${process.env.APP_URL}/api/article/deleteArticle`, sendingData)
      if(request.data.success) {
        dispatch(setLoadingOff())
        toast.success(request.data.message)
        Router.push('/dashboard/managePosts')
      }
    } catch (error) {
      dispatch(setLoadingOff())
      toast.error(error.response.data.message)
    }
  }
  
  return (
    <>
      <section className='p-8 text-indigo-900 w-full h-screen'>
        <div className='border-b border-indigo-400 w-full pb-4'>
          <h1 className='font-bold text-xl pl-6'>Manage Articles page</h1>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 h-[92%] overflow-auto mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Articles</h1>
              <p className="pt-2 text-sm text-gray-700">
                Post articles to share codes, guide employee, and provide company standards.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <NextLink
                href='/dashboard/postArticle'
                className="rounded-md bg-indigo-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center"
              >
                <MdEditDocument className='w-5 h-5 mr-2'/> Post Article
              </NextLink>
            </div>
          </div>
          <div className="pt-8 flow-root">
            <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                      >
                        SubCategory
                      </th>
                      <th
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.posts && props.posts.map((article, index) => (
                      <tr key={article._id}>
                        <td
                          className={classNames(
                            index !== props.posts.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-900 sm:pl-6 lg:pl-8'
                          )}
                        >
                          <NextLink href={`/dashboard/articles/${article._id}`} className='font-bold hover:text-indigo-400'>{article.title}</NextLink>
                        </td>
                        <td
                          className={classNames(
                            index !== props.posts.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                          )}
                        >
                          {article.category.category}
                        </td>
                        <td
                          className={classNames(
                            index !== props.posts.length - 1 ? 'border-b border-gray-200' : '',
                            'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                          )}
                        >
                          {article.subCategory.subCategory}
                        </td>
                        <td
                          className={classNames(
                            index !== props.posts.length - 1 ? 'border-b border-gray-200' : '',
                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                          )}
                        >
                          <button
                            className='text-indigo-600 hover:text-indigo-900'
                            onClick={(e) => editHandler(e, article._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ManagePosts;

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.APP_URL}/api/article/getAllArticle`)
  let data = null
  if(res.data) {
    data = res.data.articles
  }

  return { props: {posts: data}}
}