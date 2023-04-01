import { useState } from 'react'
import FormEntry from './formEntry'
import Preview from './preview'
import { MdPreview, MdOutlineCloseFullscreen } from 'react-icons/md'

const PostArticle = () => {

  const [ submitForm, setSubmitForm ] = useState({
    title: '',
    article: '',
    category: '',
    subCategory: '',
  })
  const [ tags, setTags ] = useState({
    tag: '',
  })
  const [ addedTags, setAddedTags ] = useState([])
  const [ isPreview, setIsPreview ] = useState(true)

  return (
    <section className='w-full px-8 h-screen'>
      <div className='flex items-center justify-between my-3 gap-8'>
        <form className='w-full flex gap-4'>
          <input type='search' className='border border-indigo-900 px-4 py-1 rounded-lg w-full'
            placeholder='Search article here...'
          />
          <button className='text-xs text-indigo-900 hover:text-indigo-400'>Search</button>
        </form>
        <button onClick={() => setIsPreview(!isPreview)} className='bg-indigo-50 p-2 rounded-md border-indigo-900 border hover:text-white hover:bg-indigo-900'>{isPreview ? <MdOutlineCloseFullscreen /> : <MdPreview />}</button>
      </div>
      <div className='flex flex-col md:flex-row w-full gap-4 h-[90%]'>
        <FormEntry submitForm={submitForm} setSubmitForm={setSubmitForm} tags={tags} setTags={setTags} addedTags={addedTags} setAddedTags={setAddedTags} />
        <Preview submitForm={submitForm} isPreview={isPreview} />
      </div>
    </section>
  );
}
export default PostArticle;