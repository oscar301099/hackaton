import { setGlobalState, useGlobalState } from '../store'

const Hero = () => {
  const [stats] = useGlobalState('stats')

  return (
    <div className="text-center bg-white text-gray-800 py-24 px-6">
      <div className="flex justify-center items-center space-x-4 mb-10">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-[rgb(68,180,125)] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[rgb(5,157,110)] transition duration-300"
          onClick={() => setGlobalState('createModal', 'scale-100')}
        >
          Donar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="relative w-full max-w-xs mx-auto cursor-pointer rounded-md shadow-md hover:shadow-lg transition duration-300">
            <div className="relative overflow-hidden rounded-t-md">
              <img
                src="https://via.placeholder.com/150"
                alt={`Imagen ${index + 1}`}
                className="h-[150px] w-full object-cover rounded-t-md"
              />
            </div>
            <div className="bg-gray-100 px-4 py-4 rounded-b-md">
              <h5 className="text-center font-semibold text-[rgb(68,180,125)] border-b pb-2">COSTO</h5>
              <p className="mt-2 text-center text-lg font-semibold text-[rgb(68,180,125)]">TIPO DE MONEDA</p>
              <p className="mt-2 text-center text-xs text-gray-600">FECHA INICIAL</p>
              <p className="mt-1 text-center text-xs text-gray-600">FECHA EXPIRACION</p>
              <p className="mt-2 text-center text-xs text-gray-500">MOTIVO FINANCIERO</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
