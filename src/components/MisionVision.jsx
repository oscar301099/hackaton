import React, { useEffect, useState } from 'react';
import { FaBitcoin, FaLock, FaMoneyBillWave, FaSeedling, FaLeaf, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ onLoginRedirect }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-700 text-white p-4 md:p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">CriptoSemilla</h1>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars size={24} />
        </button>
        <nav className={`flex flex-col md:flex-row md:space-x-6 ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
            <li><a href="#" className="hover:underline">Inicio</a></li>
            <li><a href="#" className="hover:underline">Servicios</a></li>
            <li><a href="#" className="hover:underline">Nosotros</a></li>
            <li><a href="#" className="hover:underline">Contacto</a></li>
          </ul>
          <button 
            onClick={onLoginRedirect} 
            className="bg-white text-green-700 px-4 py-2 rounded-full font-bold hover:bg-gray-100 mt-4 md:mt-0">
            Iniciar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-100 p-6 rounded-lg text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <Icon className="text-green-700 text-4xl mx-auto mb-4" />
    <h3 className="text-2xl font-bold mb-2 text-green-700">{title}</h3>
    <p className="text-lg">{description}</p>
  </div>
);

const Section = ({ children, className = '' }) => (
  <section className={`py-8 md:py-12 ${className}`}>
    <div className="container mx-auto px-4 md:px-0">{children}</div>
  </section>
);

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    // Este script se asegura de que el widget de Dialogflow se cargue correctamente
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-white text-gray-800 relative">
      <Header onLoginRedirect={handleLoginRedirect} />

      {/* Hero Section */}
      <Section className="p-6 md:p-10 text-center bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Plataforma Segura para Comercio de Criptomonedas en Bolivia</h2>
          <p className="text-lg mb-6">La mejor solución para proteger tus activos digitales con tecnología de vanguardia.</p>
          <button className="bg-green-700 text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition-transform transform hover:scale-105">
            Comienza Ahora
          </button>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={FaBitcoin} 
            title="Mejor Plataforma" 
            description="La plataforma más confiable y segura en Bolivia." 
          />
          <FeatureCard 
            icon={FaMoneyBillWave} 
            title="Precios Justos" 
            description="Transparencia total en precios y tarifas." 
          />
          <FeatureCard 
            icon={FaLock} 
            title="Seguridad Avanzada" 
            description="Protege tus activos con la mejor tecnología." 
          />
        </div>
      </Section>

      {/* Mission and Vision Section */}
      <Section className="bg-green-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            icon={FaSeedling} 
            title="Misión" 
            description="Nuestra misión es apoyar al sector agrícola en Bolivia proporcionando asistencia financiera durante crisis climáticas y promoviendo la adopción de prácticas sostenibles. Utilizamos tecnología blockchain y smart contracts para asegurar transparencia y eficiencia en la distribución de los fondos, y nos comprometemos a capacitar a los agricultores para que puedan enfrentar desafíos y construir un futuro agrícola resiliente y sostenible." 
          />
          <FeatureCard 
            icon={FaLeaf} 
            title="Visión" 
            description="Nuestra visión es transformar el sector agrícola en Bolivia en un modelo de resiliencia y sostenibilidad. Queremos ser el líder en el apoyo a agricultores mediante la integración de tecnología avanzada y prácticas responsables, creando un entorno agrícola donde la innovación y la transparencia conduzcan a un desarrollo continuo y a la protección del medio ambiente." 
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="bg-green-100 text-center">
        <h3 className="text-3xl font-bold mb-6">Únete a la Revolución del Comercio de Criptomonedas</h3>
        <button className="bg-green-700 text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-transform transform hover:scale-105">
          Regístrate Ahora
        </button>
      </Section>

      {/* Footer */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p className="mb-4">© 2024 CriptoSemilla. Todos los derechos reservados.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Política de Privacidad</a>
          <a href="#" className="hover:underline">Términos de Servicio</a>
        </div>
      </footer>

      {/* Dialogflow Messenger */}
      <df-messenger 
        intent="WELCOME" 
        chat-title="Asistente CriptoSemilla" 
        agent-id="86938b5f-1e37-43dc-9f38-1bd5322b1eb7" 
        language-code="es"
        chat-icon="https://www.gstatic.com/dialogflow-console/fast/messenger/messengericon.svg"  // Icono personalizado
        chat-title-bot="CryptoBot"
        chat-title-font="Verdana"
        chat-title-color="#ffffff"
        chat-bubble-color="#34d399" // Color de las burbujas de chat
        background-color="#1f2937" // Color de fondo del widget
        bot-font-color="#ffffff" // Color del texto del bot
        user-font-color="#d1fae5" // Color del texto del usuario
        placeholder-text="Escribe tu mensaje aquí..."
      ></df-messenger>
    </div>
  );
};

export default LandingPage;
