import { useRouter } from "next/router"
import BackgroundCircle from "@/components/background/backgroundCircle"
import { useState } from 'react'

const LandingContainer = () => {
  const { pathname } = useRouter()
  const [ searchedText, setSearchedText ] = useState('')

  const changeHandler = (e) => {
    setSearchedText(e.target.value)
  }
  
  const submitHandler = () => {
    console.log('clicked')
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
          onSubmit={submitHandler}
          className='flex flex-row w-full sm:max-w-lg px-8 gap-4 mt-12'
        >
          <input 
            value={searchedText} 
            onChange={(e) => changeHandler(e)} 
            placeholder='Search here...'
            className="flex-auto rounded-md border border-gray-200 bg-white/5 px-8 py-2 shadow-sm w-full"
          />
          <button
            className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-400"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
export default LandingContainer;