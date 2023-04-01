export const changeHandler = (e, func) => {
  func((prev) => ({
    ...prev,
    [e.target.name]: e.target.value
  }))
}

export const tagChangeHandler = (e, func) => {
  func({tag: e.target.value})
}

export const addTagHandler = (e, text, func, prevArry, reset) => {
  e.preventDefault()
  const duplicateValidator = () => {
    let duplicate = prevArry.find(tag => tag.tag === text.tag)
    if(!!duplicate) {
      reset({
        tag: ''
      })
      return
    } else {
      func(prev => ([
        ...prev,
        text
      ]))
      reset({
        tag: ''
      })
    }
  }
  duplicateValidator()
}

export const removeTagHandler = (e, text, func, prev) => {
  e.preventDefault()
  let prevState = prev
  let selectedTag = prev.find(tag => tag.tag === text.tag)
  let filteredState = prevState.filter(tag => tag !== selectedTag)
  func(filteredState)
}