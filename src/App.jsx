import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './views/Home'
import Project from './views/Project'
import Login from './views/login'
import MisionVision from './views/MisionVision'
import { isWallectConnected } from './services/blockchain'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [loaded, setLoaded] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const loadBlockchainData = async () => {
      await isWallectConnected()
      console.log('Blockchain loaded')
      setLoaded(true)
    }
    loadBlockchainData()
  }, [])

  // Condicionar la visualización del header
  const showHeader = location.pathname === '/home' || location.pathname.startsWith('/projects')

  return (
    <div className="min-h-screen relative">
      {showHeader && <Header />}
      {loaded ? (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MisionVision />} />
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}

export default App
