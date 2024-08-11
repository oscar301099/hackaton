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
    if (!title || !description || !cost || !date) return

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

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-background') {
      onClose()
    }
  }

  return (
    <div
      id="modal-background"
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 transition-transform duration-300 ${createModal} z-50`}
      onClick={handleClickOutside}
    >
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 relative z-50">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Crear Proyecto</h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Título */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Título</label>
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

          {/* Campo de Costo */}
          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-600">Costo (ETH)</label>
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

          {/* Campo de Fecha de Expiración */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-600">Fecha de Expiración</label>
            <input
              id="date"
              type="date"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Campo de URL de la Imagen */}
          <div>
            <label htmlFor="imageURL" className="block text-sm font-medium text-gray-600">URL de la Imagen</label>
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

          {/* Campo de Descripción */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">Descripción</label>
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

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white font-medium text-sm leading-tight rounded-full shadow-md hover:bg-green-700 transition duration-300"
          >
            Crear Proyecto
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
