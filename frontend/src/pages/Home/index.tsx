import React from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from '../../config';
import AboutSection from './sections/AboutSection';
import CampaignSection from './sections/CampaignSection';
import FAQSection from './sections/FAQSection';
import LinksSection from './sections/LinksSection';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handlePresaleClick = () => {
    navigate('/presale');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #3E7C47, #5C3A21)' }}>
      {/* Header Section */}
      <header className="py-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(to right, #FFD700, #2E8B57)' }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="SPRAI Logo"
            className="w-24 sm:w-32 lg:w-36 mx-auto mb-6"
          />

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {config.tokenSymbol} TOKEN
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl mb-6">
            A CRIPTOMOEDA PARA UM FUTURO SUSTENTÁVEL E DIGITAL.
          </p>

          {/* Banner Image */}
          <img
            src="/banner-dois.jpeg"
            alt="SPRAI Banner"
            className="w-full max-w-2xl mx-auto rounded-lg mb-8"
          />

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handlePresaleClick}
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: '#2E7D32',
                border: '2px solid #1B5E20',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
            >
              💰 Comprar {config.tokenSymbol}
            </button>
            <a
              href="/Whitepaper_SPRAI_PT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: '#2E7D32',
                border: '2px solid #1B5E20',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
            >
              📄 Ver Whitepaper (PT)
            </a>
            <a
              href="/Whitepaper_SPRAI_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={{
                backgroundColor: '#2E7D32',
                border: '2px solid #1B5E20',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)'
              }}
            >
              📄 View Whitepaper (EN)
            </a>
          </div>
        </div>
      </header>

      {/* Sections */}
      <AboutSection />
      <CampaignSection />
      <FAQSection />
      <LinksSection />

      {/* Bottom Banner */}
      <div className="py-8 px-4 text-center">
        <img
          src="/sprai-banner.png"
          alt="SPRAI Banner"
          className="w-full max-w-lg mx-auto rounded-2xl"
        />
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-white">
        <p>© 2025 {config.tokenSymbol} Token – Todos os direitos reservados.</p>
        <p className="mt-2 text-sm opacity-80">Contato: support@spraicoin.net</p>
      </footer>
    </div>
  );
};

export default Home;
