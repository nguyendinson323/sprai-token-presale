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
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'linear-gradient(to right, #FFD700, #2E8B57)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section */}
      <header className="min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="SPRAI Logo"
            className="w-32 sm:w-40 lg:w-48 mx-auto mb-8 block anim-fade-down anim-light-slow"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(255, 215, 0, 0.3))' }}
          />

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-4 anim-zoom-in anim-normal anim-delay-200"
            style={{
              color: '#1a1a1a',
              textShadow: '0 2px 4px rgba(255, 255, 255, 0.3)',
            }}
          >
            {config.tokenSymbol} TOKEN
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl lg:text-3xl text-center mb-8 anim-fade-up anim-light-slow anim-delay-400"
            style={{ color: '#1a1a1a', textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)' }}
          >
            A CRIPTOMOEDA PARA UM FUTURO SUSTENTAVEL E DIGITAL
          </p>

          {/* Banner Image */}
          <img
            src="/banner-dois.jpeg"
            alt="SPRAI Banner"
            className="w-full max-w-3xl mx-auto mb-10 block anim-zoom-out anim-slow anim-delay-600 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)', borderRadius: '6px' }}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-up anim-light-slow anim-delay-800">
            <button
              onClick={handlePresaleClick}
              className="px-8 py-4 font-bold text-black text-lg transition-all hover:shadow-2xl anim-pulse"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                boxShadow: '0 8px 20px rgba(255, 215, 0, 0.4)',
                borderRadius: '6px',
              }}
            >
              💰 Comprar {config.tokenSymbol}
            </button>
            <a
              href="/Whitepaper_SPRAI_PT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 font-bold text-lg transition-all border-2 border-black/40 hover:bg-white/30 text-black"
              style={{ borderRadius: '6px' }}
            >
              Ver Whitepaper (PT)
            </a>
            <a
              href="/Whitepaper_SPRAI_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 font-bold text-lg transition-all border-2 border-black/40 hover:bg-white/30 text-black"
              style={{ borderRadius: '6px' }}
            >
              View Whitepaper (EN)
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
      <div className="py-16 px-4 text-center">
        <img
          src="/sprai-banner.png"
          alt="SPRAI Banner"
          className="w-full max-w-2xl mx-auto anim-zoom-in anim-slow transition-transform duration-300 hover:scale-105 hover:rotate-2"
          style={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)', borderRadius: '6px' }}
        />
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-black/20">
        <p className="text-black/90 mb-2">
          2025 {config.tokenSymbol} Token - Todos os direitos reservados.
        </p>
        <p className="text-black/70 text-sm">Contato: support@spraicoin.net</p>
      </footer>
    </div>
  );
};

export default Home;
