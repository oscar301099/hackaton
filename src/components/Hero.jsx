import React, { useEffect, useState } from 'react'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'
import { toast } from 'react-toastify'

const Hero = () => {
  const [stats] = useGlobalState('stats')
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/proyect.json')
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setProjects(data.proyectos)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [])

  const handleDonation = async (project) => {
    try {
      // Utilizando createProject para realizar la donación, puedes personalizar los parámetros.
      const params = {
        title: project.titulo,
        description: project.motivo_financiero,
        cost: project.costo.cantidad,
        expiresAt: new Date(project.fecha_expiracion).getTime() / 1000,
        imageURL: project.foto,
      }

      await createProject(params) // Aquí se llama a la función para realizar la acción (que puede ser donación en tu caso)
      toast.success('Donation successful!')
    } catch (error) {
      toast.error('Donation failed. Please try again.')
    }
  }

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
        {projects.map((project, index) => (
          <div key={index} className="relative w-full max-w-xs mx-auto cursor-pointer rounded-md shadow-md hover:shadow-lg transition duration-300">
            <div className="relative overflow-hidden rounded-t-md">
              <img
                src={project.foto}
                alt={project.titulo}
                className="h-[150px] w-full object-cover rounded-t-md"
              />
              <button
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 rounded-full px-4 py-2 text-sm shadow-md"
              >
                <i className="bx bxs-show ml-1" />
              </button>
            </div>
            <div className="bg-gray-100 px-4 py-4 rounded-b-md">
              <h5 className="text-center font-semibold text-[rgb(68,180,125)] border-b pb-2">{project.titulo}</h5>
              <p className="mt-2 text-center text-lg font-semibold text-[rgb(68,180,125)]">{project.costo.cantidad} {project.costo.moneda}</p>
              <p className="mt-2 text-center text-xs text-gray-600">Fecha inicial: {project.fecha_inicial}</p>
              <p className="mt-2 text-center text-xs text-gray-600">Fecha expiración: {project.fecha_expiracion}</p>
              <p className="mt-2 text-center text-xs text-gray-500">Motivo: {project.motivo_financiero}</p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handleDonation(project)}
                  className="flex items-center justify-center rounded-lg border-2 border-[rgb(68,180,125)] bg-[rgb(68,180,125)] px-3 py-2 font-bold text-white hover:bg-[rgb(5,157,110)] transition duration-300"
                >
                  Donar
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
