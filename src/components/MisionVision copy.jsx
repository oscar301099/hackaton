import React from 'react';
import { FaBitcoin, FaLock, FaMoneyBillWave, FaSeedling, FaLeaf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

// Firebase configuration (reemplaza con tu configuración)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const LandingPage = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleLogin = () => {
    navigate('/home');
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Esto te redirige a la página de inicio después de iniciar sesión con Google
        navigate('/home');
      }).catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="bg-green-700 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">CriptoBolivia</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:underline">Inicio</a></li>
              <li><a href="#" className="hover:underline">Servicios</a></li>
              <li><a href="#" className="hover:underline">Nosotros</a></li>
              <li><a href="#" className="hover:underline">Contacto</a></li>
            </ul>
          </nav>
          <button 
            onClick={handleLogin}
            className="bg-white text-green-700 px-4 py-2 rounded-full font-bold hover:bg-gray-100"
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={handleGoogleLogin}
            className="bg-white text-green-700 px-4 py-2 rounded-full font-bold ml-4 hover:bg-gray-100"
          >
            Iniciar con Google
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-10 text-center bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Plataforma Segura para Comercio de Criptomonedas en Bolivia</h2>
          <p className="text-lg mb-6">La mejor solución para proteger tus activos digitales con tecnología de vanguardia.</p>
          <button className="bg-green-700 text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition-transform transform hover:scale-105">Comienza Ahora</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaBitcoin className="text-green-700 text-4xl mx-auto mb-4"/>
            <h3 className="text-2xl font-bold mb-2 text-green-700">Mejor Plataforma</h3>
            <p className="text-lg">La plataforma más confiable y segura en Bolivia.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaMoneyBillWave className="text-green-700 text-4xl mx-auto mb-4"/>
            <h3 className="text-2xl font-bold mb-2 text-green-700">Precios Justos</h3>
            <p className="text-lg">Transparencia total en precios y tarifas.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <FaLock className="text-green-700 text-4xl mx-auto mb-4"/>
            <h3 className="text-2xl font-bold mb-2 text-green-700">Seguridad Avanzada</h3>
            <p className="text-lg">Protege tus activos con la mejor tecnología.</p>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaSeedling className="text-green-700 text-4xl mx-auto mb-4"/>
            <h3 className="text-3xl font-bold mb-4 text-green-700">Misión</h3>
            <p className="text-lg">Nuestra misión es apoyar al sector agrícola en Bolivia proporcionando asistencia financiera durante crisis climáticas y promoviendo la adopción de prácticas sostenibles. Utilizamos tecnología blockchain y smart contracts para asegurar transparencia y eficiencia en la distribución de los fondos, y nos comprometemos a capacitar a los agricultores para que puedan enfrentar desafíos y construir un futuro agrícola resiliente y sostenible.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <FaLeaf className="text-green-700 text-4xl mx-auto mb-4"/>
            <h3 className="text-3xl font-bold mb-4 text-green-700">Visión</h3>
            <p className="text-lg">Nuestra visión es transformar el sector agrícola en Bolivia en un modelo de resiliencia y sostenibilidad. Queremos ser el líder en el apoyo a agricultores mediante la integración de tecnología avanzada y prácticas responsables, creando un entorno agrícola donde la innovación y la transparencia conduzcan a un desarrollo continuo y a la protección del medio ambiente.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-100">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Únete a la Revolución del Comercio de Criptomonedas</h3>
          <button className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-transform transform hover:scale-105">Regístrate Ahora</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p className="mb-4">© 2024 CriptoBolivia. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Política de Privacidad</a>
          <a href="#" className="hover:underline">Términos de Servicio</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
