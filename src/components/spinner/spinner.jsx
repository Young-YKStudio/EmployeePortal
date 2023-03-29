import { useSelector } from 'react-redux';

const Spinner = (props) => {
  const { isLoading } = useSelector((state) => state.cart)

  if(isLoading) {
    return (
      <div className='spinnerContainer'>
        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        <p>Loading...</p>
      </div>
    )
  }
}

export default Spinner;