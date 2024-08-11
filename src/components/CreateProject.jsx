import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !cost || !date ) return

    const params = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    await createProject(params)
    toast.success('Proyecto creado exitosamente, se reflejará en 30 segundos.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${createModal}`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Subir Proyecto</h2>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex justify-center items-center mb-5">
            <div className="rounded-lg overflow-hidden h-24 w-24 border border-gray-300">
              <img
                src={
                  imageURL ||
                  'https://via.placeholder.com/150'
                }
                alt="Imagen del proyecto"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="text-sm font-medium text-gray-600">Título</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Título del proyecto"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="cost" className="text-sm font-medium text-gray-600">Costo (ETH)</label>
            <input
              id="cost"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Costo en ETH"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="date" className="text-sm font-medium text-gray-600">Fecha de Expiración</label>
            <input
              id="date"
              type="date"
              name="date"
              placeholder="Fecha de expiración"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="imageURL" className="text-sm font-medium text-gray-600">URL de la Imagen</label>
            <input
              id="imageURL"
              type="url"
              name="imageURL"
              placeholder="URL de la imagen"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="text-sm font-medium text-gray-600">Descripción</label>
            <textarea
              id="description"
              name="description"
              placeholder="Descripción del proyecto"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-md leading-tight rounded-full shadow-md hover:bg-green-700 transition duration-300"
          >
            Crear Proyecto
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
