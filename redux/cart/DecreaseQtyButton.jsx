import { useDispatch } from "react-redux"
import { qtyDecrease } from "../cartSlice"
import { MdOutlineRemove } from 'react-icons/md'

const RdxDecreaseQtyButton = ({item}) => {
  const dispatch = useDispatch()

  const qtyDecreaseButton = (item) => {
    dispatch(qtyDecrease(item))
  }

  return (
    <button
      className='p-1 border border-gray-300 rounded-md hover:border-indigo-400'
      onClick={() => qtyDecreaseButton(item)}
    >
      <MdOutlineRemove />
    </button>
  )
}

export default RdxDecreaseQtyButton