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
  const [currency, setCurrency] = useState('ETH')
  const [startDate, setStartDate] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [location, setLocation] = useState('')
  const [logoURL, setLogoURL] = useState('')
  const [socialMedia, setSocialMedia] = useState('')
  const [wallet, setWallet] = useState('')
  const [nit, setNit] = useState('')
  const [sectorCategory, setSectorCategory] = useState('')
  const [solutionCategory, setSolutionCategory] = useState('')
  const [fundingReason, setFundingReason] = useState('')
  const [financialDocs, setFinancialDocs] = useState(null)
  const [terms, setTerms] = useState(false)

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !cost || !expirationDate || !terms) return

    const params = {
      title,
      description,
      cost,
      currency,
      startDate: toTimestamp(startDate),
      expiresAt: toTimestamp(expirationDate),
      location,
      logoURL,
      socialMedia,
      wallet,
      nit,
      sectorCategory,
      solutionCategory,
      fundingReason,
      financialDocs,
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
    setCurrency('ETH')
    setStartDate('')
    setExpirationDate('')
    setLocation('')
    setLogoURL('')
    setSocialMedia('')
    setWallet('')
    setNit('')
    setSectorCategory('')
    setSolutionCategory('')
    setFundingReason('')
    setFinancialDocs(null)
    setTerms(false)
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
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl p-6 relative z-50 overflow-y-auto max-h-full">
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
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campo de Título */}
          <div className="col-span-1">
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
          <div className="col-span-1">
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

          {/* Tipo de Moneda */}
          <div className="col-span-1">
            <label htmlFor="currency" className="block text-sm font-medium text-gray-600">Tipo de Moneda</label>
            <input
              id="currency"
              type="text"
              name="currency"
              placeholder="ETH, USD, etc."
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Fecha de Inicio */}
          <div className="col-span-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-600">Fecha de Inicio</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Fecha de Expiración */}
          <div className="col-span-1">
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

          {/* Geolocalización (Google Map) */}
          <div className="col-span-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-600">Geolocalización (Google Map)</label>
            <input
              id="location"
              type="text"
              name="location"
              placeholder="URL de la ubicación en Google Maps"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* URL del Logo */}
          <div className="col-span-1">
            <label htmlFor="logoURL" className="block text-sm font-medium text-gray-600">URL del Logo</label>
            <input
              id="logoURL"
              type="url"
              name="logoURL"
              placeholder="URL del logo"
              onChange={(e) => setLogoURL(e.target.value)}
              value={logoURL}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Redes Sociales */}
          <div className="col-span-1">
            <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-600">Redes Sociales</label>
            <input
              id="socialMedia"
              type="text"
              name="socialMedia"
              placeholder="Enlaces de redes sociales"
              onChange={(e) => setSocialMedia(e.target.value)}
              value={socialMedia}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Billetera Virtual */}
          <div className="col-span-1">
            <label htmlFor="wallet" className="block text-sm font-medium text-gray-600">Billetera Virtual</label>
            <input
              id="wallet"
              type="text"
              name="wallet"
              placeholder="Dirección de billetera virtual"
              onChange={(e) => setWallet(e.target.value)}
              value={wallet}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* NIT */}
          <div className="col-span-1">
            <label htmlFor="nit" className="block text-sm font-medium text-gray-600">NIT</label>
            <input
              id="nit"
              type="text"
              name="nit"
              placeholder="Número de NIT"
              onChange={(e) => setNit(e.target.value)}
              value={nit}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Categoría por Sectores */}
          <div className="col-span-1">
            <label htmlFor="sectorCategory" className="block text-sm font-medium text-gray-600">Categoría por Sectores</label>
            <input
              id="sectorCategory"
              type="text"
              name="sectorCategory"
              placeholder="Categoría del sector"
              onChange={(e) => setSectorCategory(e.target.value)}
              value={sectorCategory}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Categoría por Soluciones */}
          <div className="col-span-1">
            <label htmlFor="solutionCategory" className="block text-sm font-medium text-gray-600">Categoría por Soluciones</label>
            <input
              id="solutionCategory"
              type="text"
              name="solutionCategory"
              placeholder="Categoría de la solución"
              onChange={(e) => setSolutionCategory(e.target.value)}
              value={solutionCategory}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
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
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            ></textarea>
          </div>

          {/* Subir Documentos Financieros */}
          <div className="col-span-3">
            <label htmlFor="financialDocs" className="block text-sm font-medium text-gray-600">Documentos Financieros (Opcional)</label>
            <input
              id="financialDocs"
              type="file"
              name="financialDocs"
              onChange={(e) => setFinancialDocs(e.target.files[0])}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring focus:ring-green-300 focus:border-green-500"
            />
          </div>

          {/* Términos y Condiciones */}
          <div className="col-span-3">
            <label htmlFor="terms" className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-600">Acepto los términos y condiciones</span>
            </label>
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
