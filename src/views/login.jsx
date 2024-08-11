import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la redirección

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Aquí puedes agregar la lógica de autenticación

    setError('');
    setEmail('');
    setPassword('');

    // Redirigir a la ruta /home después del login exitoso
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img 
            src="https://path-to-crypto-icon.com/icon.png" 
            alt="Crypto Icon" 
            className="w-16 h-16" 
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-green-800">Iniciar Sesión</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="ejemplo@dominio.com"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#44b47d] text-white py-2 px-4 rounded-md hover:bg-[#3aa66c] transition-colors duration-300"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
