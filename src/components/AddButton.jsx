import { setGlobalState } from '../store'
import { BsPlusLg } from 'react-icons/bs'

const AddButton = () => {
  return (
    <div className="fixed right-10 bottom-10 flex space-x-2 justify-center">
      <button
        type="button"
        className="flex justify-center items-center w-10 h-10 bg-gradient-to-r from-green-500 via-green-600 to-green-700
        text-white font-medium text-xs leading-tight uppercase
        rounded-full shadow-lg hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => setGlobalState('createModal', 'scale-100')}
      >
        <BsPlusLg className='font-bold' size={20} />
      </button>
    </div>
  )
}

export default AddButton
