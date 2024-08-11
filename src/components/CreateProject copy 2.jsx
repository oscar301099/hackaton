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
  const [currency, setCurrency] = useState('')
  const [startDate, setStartDate] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [terms, setTerms] = useState(false)
  const [location, setLocation] = useState('')
  const [imageURL, setImageURL] = useState('')
  const [socialMedia, setSocialMedia] = useState('')
  const [wallet, setWallet] = useState('')
  const [nit, setNit] = useState('')
  const [fundingReason, setFundingReason] = useState('')
  const [financialDoc, setFinancialDoc] = useState(null)

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !cost || !expirationDate) return

    const params = {
      title,
      description,
      cost,
      currency,
      startDate,
      expiresAt: toTimestamp(expirationDate),
      terms,
      location,
      imageURL,
      socialMedia,
      wallet,
      nit,
      fundingReason,
      financialDoc,
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
    setDescription('')
    setCost('')
    setCurrency('')
    setStartDate('')
    setExpirationDate('')
    setTerms(false)
    setLocation('')
    setImageURL('')
    setSocialMedia('')
    setWallet('')
    setNit('')
    setFundingReason('')
    setFinancialDoc(null)
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl p-6 relative z-50">
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
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
          {/* Campos de Entrada */}
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

          <div>
            <label htmlFor="cost" className="block text-sm font-medium text-gray-600">Costo</label>
            <input
              id="cost"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Costo del proyecto"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="currency" className="block text-sm font-medium text-gray-600">Tipo de Moneda</label>
            <input
              id="currency"
              type="text"
              name="currency"
              placeholder="Tipo de moneda"
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">Fecha de Inicio</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-600">Fecha de Expiración</label>
            <input
              id="expirationDate"
              type="date"
              name="expirationDate"
              onChange={(e) => setExpirationDate(e.target.value)}
              value={expirationDate}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">Geolocalización</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="Geolocalización del lugar"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

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

          <div>
            <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-600">Redes Sociales</label>
            <input
              id="socialMedia"
              type="text"
              name="socialMedia"
              placeholder="Redes sociales de la persona"
              onChange={(e) => setSocialMedia(e.target.value)}
              value={socialMedia}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="wallet" className="block text-sm font-medium text-gray-600">Billetera Virtual (Wallet)</label>
            <input
              id="wallet"
              type="text"
              name="wallet"
              placeholder="Dirección de la billetera virtual"
              onChange={(e) => setWallet(e.target.value)}
              value={wallet}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          <div>
            <label htmlFor="nit" className="block text-sm font-medium text-gray-600">NIT</label>
            <input
              id="nit"
              type="text"
              name="nit"
              placeholder="Número de Identificación Tributaria"
              onChange={(e) => setNit(e.target.value)}
              value={nit}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Términos y Condiciones */}
          <div className="flex items-center col-span-3">
            <input
              id="terms"
              type="checkbox"
              name="terms"
              onChange={(e) => setTerms(e.target.checked)}
              checked={terms}
              required
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm font-medium text-gray-600">Aceptar Términos y Condiciones</label>
          </div>

          {/* Motivo del Financiamiento */}
          <div className="col-span-3">
            <label htmlFor="fundingReason" className="block text-sm font-medium text-gray-600">Motivo del Financiamiento</label>
            <textarea
              id="fundingReason"
              name="fundingReason"
              placeholder="Motivo del financiamiento"
              onChange={(e) => setFundingReason(e.target.value)}
              value={fundingReason}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            ></textarea>
          </div>

          {/* Subir Documentos Financieros Recientes */}
          <div className="col-span-3">
            <label htmlFor="financialDoc" className="block text-sm font-medium text-gray-600">Subir Documentos Financieros Recientes (Opcional)</label>
            <input
              id="financialDoc"
              type="file"
              name="financialDoc"
              onChange={(e) => setFinancialDoc(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Botón de Envío */}
          <div className="col-span-3">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-medium text-sm leading-tight rounded-full shadow-md hover:bg-green-700 transition duration-300"
            >
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
