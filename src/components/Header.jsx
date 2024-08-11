import { TbBusinessplan } from 'react-icons/tb'
import { BsBarChart } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { connectWallet } from '../services/blockchain'
import { truncate, useGlobalState } from '../store'

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')

  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="flex items-center text-xl text-black space-x-2">
        <div className="flex items-center">
          <img
            src="/path-to-logo.jpg" // Reemplaza con la ruta de tu logo
            alt="FoundBusiness Logo"
            className="h-10 w-10 rounded-full"
          />
        </div>
        <span className="hidden sm:block text-lg">FoundBusiness</span>
        <TbBusinessplan className="hidden sm:block text-lg" />
      </Link>

      <div className="flex-1 mx-5">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full px-4 py-2 rounded-lg bg-[hsl(0,0%,90%)] text-black focus:outline-none focus:ring-2 focus:ring-[rgb(68,180,125)]"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Link
          to="/stats"
          className="flex items-center justify-center rounded-full bg-[rgb(68,180,125)] text-white p-2 text-lg hover:bg-[rgb(5,157,110)] transition-colors duration-300"
        >
          <BsBarChart />
        </Link>
        
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
    </header>
  )
}

export default Header
