import { useState } from 'react'

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

  return (
    <section>
      <div>
        <p>search bar here</p>
      </div>
      <div className='grid grid-cols-2 w-full'>
        <p>left side here</p>
        <p>right side here</p>
      </div>
    </section>
  );
}
export default PostArticle;