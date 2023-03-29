import { useDispatch } from "react-redux";
import { qtyIncrease } from "../cartSlice";
import { MdOutlineAdd } from "react-icons/md";

const RdxQtyAddButton = ({item}) => {
  const dispatch = useDispatch()

  const qtyAddButton = (item) => {
    dispatch(qtyIncrease(item))
  }

  return (
    <button
    className='p-1 border border-gray-300 rounded-md hover:border-indigo-400'
    onClick={() => qtyAddButton(item)}
    >
      <MdOutlineAdd />
    </button>
  )
}

export default RdxQtyAddButton