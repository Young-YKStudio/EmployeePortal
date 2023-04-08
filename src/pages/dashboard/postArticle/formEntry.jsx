import { changeHandler, tagChangeHandler, addTagHandler, removeTagHandler } from "./functions"
import { MdRemoveCircleOutline } from "react-icons/md"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice'
import { toast } from "react-toastify"

const FormEntry = ({submitForm, setSubmitForm, tags, setTags, addedTags, setAddedTags}) => {

  const { title, article, category, subCategory } = submitForm
  const { tag } = tags
  const dispatch = useDispatch()
  
  const submitHandler = (e, form, tag) => {
    e.preventDefault()
    let registerForm = {
      title: form.title,
      article: form.article,
      category: form.category,
      subCategory: form.subCategory,
      tag: addedTags,
    }
  
    const requestToApi = async (data) => {
      dispatch(setLoadingOn())
      try {
        const request = await axios.post('/api/article/registerArticle', data)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success(request.data.message)
          setSubmitForm({
            title: '',
            article: '',
            category: '',
            subCategory: '',
          })
          setTags({
            tag: '',
          })
          setAddedTags([])
        } else {
          dispatch(setLoadingOff())
          toast.error(request.response.data.message)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error(error.response.data.message)
      }
    }
    requestToApi(registerForm)
  }

  return (
    <form className="text-xs flex flex-col justify-center w-full relative">
      <div className="absolute top-0 w-full flex justify-center pt-4">
        <p className="font-extrabold text-indigo-900 text-base">Article Entry</p>
      </div>
      <label className="mt-12 md:mt-0">Title</label>
      <input type='text' name='title' value={title} 
        className="border border-indigo-500 rounded-md w-full px-2 py-1 mb-4"
        onChange={(e) => changeHandler(e, setSubmitForm)}
      />
      <label>Category</label>
      <input type='text' name='category' value={category} 
        className="border border-indigo-500 rounded-md w-full px-2 py-1 mb-4"
        onChange={(e) => changeHandler(e, setSubmitForm)}
      />
      <label>Sub Category</label>
      <input type='text' name='subCategory' value={subCategory} 
        className="border border-indigo-500 rounded-md w-full px-2 py-1 mb-4"
        onChange={(e) => changeHandler(e, setSubmitForm)}
      />
      <label>Tags</label>
      <input type='text' name='tags' value={tag} 
        className="border border-indigo-500 rounded-md w-full px-2 py-1 mb-2"
        onChange={(e) => tagChangeHandler(e, setTags)}
      />
      <div className="flex w-full mb-2">
        {addedTags.length > 0 && addedTags.map((tag, i) => {
          return <div
            key={i}
            className="mx-1 flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-900"
          >
            <p>{tag.tag}</p>
            <p 
              className="text-red-800 hover:text-red-300 hover:cursor-pointer ml-1"
              onClick={(e) => removeTagHandler(e, tag, setAddedTags, addedTags)}
            >
              <MdRemoveCircleOutline />
            </p>
          </div>
        })}
      </div>
      <button 
        onClick={(e) => addTagHandler(e, tags, setAddedTags, addedTags, setTags)}
        className="mb-4 px-2 py-2 text-white bg-indigo-900 rounded-md hover:bg-indigo-500"
      >
        Add Tag
      </button>
      <label>Article</label>
      <textarea type='text' name='article' value={article} 
        className="border border-indigo-500 rounded-md w-full p-2 overflow-auto mb-4"
        onChange={(e) => changeHandler(e, setSubmitForm)}
        rows={6}
        placeholder="Post something to share in markdown format only."
      />
      <button onClick={(e) =>  submitHandler(e, submitForm, tags)}
        className="mb-4 px-2 py-2 text-white bg-indigo-900 rounded-md hover:bg-indigo-500 text-base"
      >
        Submit Article
      </button>
    </form>
  );
}
export default FormEntry;