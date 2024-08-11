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
          Agregar Proyecto
        </button>

        <button
          type="button"
          className="inline-block px-6 py-2.5 border border-[rgb(68,180,125)] font-medium text-xs leading-tight uppercase text-[rgb(68,180,125)] rounded-full shadow-md bg-transparent hover:bg-[rgb(5,157,110)] hover:text-white transition duration-300"
        >
          Proyectos Anteriores
        </button>
      </div>

      <div className="flex justify-center items-center mt-10 space-x-4">
        <div className="flex flex-col justify-center items-center h-20 w-24 border border-[hsl(0,0%,33%)] shadow-md rounded-lg">
          <span className="text-lg font-bold text-[hsl(0,0%,33%)]">{stats?.totalProjects || 0}</span>
          <span className="text-sm">Proyectos</span>
        </div>
        <div className="flex flex-col justify-center items-center h-20 w-24 border border-[hsl(0,0%,33%)] shadow-md rounded-lg">
          <span className="text-lg font-bold text-[hsl(0,0%,33%)]">{stats?.totalBacking || 0}</span>
          <span className="text-sm">Respaldos</span>
        </div>
        <div className="flex flex-col justify-center items-center h-20 w-24 border border-[hsl(0,0%,33%)] shadow-md rounded-lg">
          <span className="text-lg font-bold text-[hsl(0,0%,33%)]">{stats?.totalDonations || 0} ETH</span>
          <span className="text-sm">Donado</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="relative w-full max-w-xs mx-auto cursor-pointer rounded-md shadow-md hover:shadow-lg transition duration-300">
            <div className="relative overflow-hidden rounded-t-md">
              <img
                src=""
                alt=""
                className="h-[150px] w-full object-cover rounded-t-md"
              />
              <span className="absolute right-2 top-2 rounded-sm bg-orange-500 px-2 py-1 text-xs text-white">
                descuento% Off
              </span>
              <button
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full px-4 py-2 text-sm shadow-md"
              >
                <i className="bx bxs-show ml-1" />
              </button>
            </div>
            <div className="bg-gray-100 px-4 py-4 rounded-b-md">
              <h5 className="text-center font-semibold text-[rgb(68,180,125)] border-b pb-2">nombre</h5>
              <p className="mt-2 text-center text-lg font-semibold text-[rgb(68,180,125)]">precio BTC</p>
              <p className="mt-2 text-center text-xs text-gray-600">descripción breve</p>
              <p className="mt-1 text-center text-xs text-gray-600">descripción larga</p>
              <p className="mt-2 text-center text-xs text-gray-500">Publicado el: fecha</p>
              <div className="mt-4 flex justify-center">
                <button className="flex items-center justify-center rounded-full border-2 border-[rgb(68,180,125)] bg-[rgb(68,180,125)] px-3 py-2 font-bold text-white hover:bg-[rgb(5,157,110)] transition duration-300">
                  Agregar al Carrito
                  <i className="bx bx-cart ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hero
