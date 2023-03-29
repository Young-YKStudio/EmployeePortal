import { useDispatch } from "react-redux"
import { MdLogout } from 'react-icons/md'
import { logout } from '../../redux/cartSlice'

export const RdxLogOutButton1 = () => {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <button
      className='hover:bg-indigo-400/50 px-4 py-2 rounded-md flex items-center'
      onClick={logoutHandler}
    >
      <MdLogout className='mr-2 w-5 h-5'/>Logout
    </button>
  )
}