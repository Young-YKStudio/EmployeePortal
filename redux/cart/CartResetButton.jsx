import { useDispatch } from "react-redux";
import { cartReset } from "../cartSlice";

const CartResetButton = ({text}) => {
  const dispatch = useDispatch()

  const resetButton = () => {
    dispatch(cartReset())
  }

  return (
    <button
      onClick={resetButton}
      className='mt-4 w-full py-3 bg-indigo-900 text-white rounded-md hover:bg-indigo-400'
    >
      {text}
    </button>
  )
} 

export default CartResetButton