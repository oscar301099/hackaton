import { TbBusinessplan } from 'react-icons/tb'
import { BsBarChart } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto md:p-5 md:flex-row md:justify-between md:bg-gray-50">
      <div className="flex justify-between items-center w-full md:w-auto">
        {/* Logo y nombre en vista web */}
        <Link to="/" className="hidden md:flex items-center text-xl text-black space-x-2">
          <img
            src="/path-to-logo.jpg" // Reemplaza con la ruta de tu logo
            alt="FoundBusiness Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-lg">FoundBusiness</span>
        </Link>

        {/* Menú desplegable en móvil */}
        <button className="md:hidden">
          <i className="bx bx-menu text-2xl"></i>
        </button>
      </div>

      {/* Barra de búsqueda en web */}
      <div className="hidden md:flex flex-1 mx-5">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-4 py-2 rounded-lg bg-[hsl(0,0%,90%)] text-black focus:outline-none focus:ring-2 focus:ring-[rgb(68,180,125)]"
        />
      </div>

      <div className="flex justify-around items-center space-x-4 w-full md:w-auto">
        {/* Iconos de navegación */}
        <Link to="/stats" className="flex flex-col items-center text-gray-600 md:flex-row md:space-x-2">
          <BsBarChart className="text-2xl" />
          <span className="hidden md:block">Estadísticas</span>
        </Link>

        {/* Estado de la conexión de la cuenta */}
        {connectedAccount ? (
          <button
            type="button"
            className="inline-block px-4 py-2 bg-[rgb(68,180,125)] text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-[rgb(5,157,110)]"
          >
            {truncate(connectedAccount, 4, 4, 11)}
          </button>
        ) : (
          <button
            type="button"
            className="inline-block px-4 py-2 bg-[rgb(68,180,125)] text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-[rgb(5,157,110)]"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}

        {/* Icono de avatar con menú desplegable */}
        <div className="relative">
          <button
            id="avatar-button"
            className="flex items-center rounded-full bg-[rgb(68,180,125)] p-2 transition-shadow duration-200 hover:shadow-lg focus:outline-none"
          >
            <img src="/path-to-avatar.jpg" alt="Avatar" className="h-8 w-8 rounded-full" />
          </button>

          <div
            id="dropdown-menu"
            className="absolute right-0 mt-2 hidden w-48 origin-top-right scale-95 transform-gpu rounded-lg bg-[hsl(0,0%,90%)] shadow-lg ring-1 ring-black ring-opacity-5 transition-transform duration-200 focus:outline-none"
            aria-labelledby="avatar-button"
          >
            <div className="p-2">
              <Link
                to="/profile"
                className="flex items-center rounded-md px-4 py-2 text-black transition-colors duration-200 text-sm"
              >
                <i className="bx bx-user mr-2 text-black"></i>
                Profile
              </Link>
              <Link
                to="/settings"
                className="flex items-center rounded-md px-4 py-2 text-black transition-colors duration-200 text-sm"
              >
                <i className="bx bx-cog mr-2 text-black"></i>
                Settings
              </Link>
              <Link
                to="/logout"
                className="flex items-center rounded-md px-4 py-2 text-black transition-colors duration-200 text-sm"
              >
                <i className="bx bx-log-in-circle mr-2 text-black"></i>
                Log out
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de navegación inferior en móvil */}
      <div className="md:hidden flex justify-between w-full">
        <Link to="/profile" className="flex flex-col items-center text-gray-600">
          <i className="bx bx-user text-2xl"></i>
          <span className="text-xs">Perfil</span>
        </Link>
        <Link to="/" className="flex flex-col items-center text-gray-600">
          <i className="bx bx-home-alt text-2xl"></i>
          <span className="text-xs">Inicio</span>
        </Link>
        <Link to="/favorites" className="flex flex-col items-center text-gray-600">
          <i className="bx bx-heart text-2xl"></i>
          <span className="text-xs">Favoritos</span>
        </Link>
        <Link to="/more" className="flex flex-col items-center text-gray-600">
          <i className="bx bx-grid-alt text-2xl"></i>
          <span className="text-xs">Más</span>
        </Link>
      </div>
    </header>
  )
}

export default Header
