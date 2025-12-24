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
        background: 'linear-gradient(135deg, rgba(46, 139, 87, 0.95) 0%, rgba(27, 94, 32, 0.85) 50%, rgba(20, 60, 25, 0.95) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Hero Section */}
      <header
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: `url('data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)"/%3E%3C/svg%3E')`,
          backgroundAttachment: 'fixed',
          backgroundSize: '40px 40px',
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 to-transparent pointer-events-none" />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(46, 139, 87, 0.95) 100%)' }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 max-w-6xl">
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
              color: '#FFD700',
              textShadow: '0 0 30px rgba(255, 215, 0, 0.5), 0 0 60px rgba(255, 215, 0, 0.3)',
            }}
          >
            {config.tokenSymbol} TOKEN
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl lg:text-3xl text-center mb-8 text-white/95 anim-fade-up anim-light-slow anim-delay-400"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            A CRIPTOMOEDA PARA UM FUTURO SUSTENTÁVEL E DIGITAL
          </p>

          {/* Banner Image */}
          <img
            src="/banner-dois.jpeg"
            alt="SPRAI Banner"
            className="w-full max-w-3xl mx-auto rounded-2xl mb-10 block anim-zoom-out anim-slow anim-delay-600 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)' }}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-up anim-light-slow anim-delay-800">
            <button
              onClick={handlePresaleClick}
              className="px-8 py-4 rounded-lg font-bold text-black text-lg transition-all hover:shadow-2xl anim-pulse"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                boxShadow: '0 8px 20px rgba(255, 215, 0, 0.4)',
              }}
            >
              💰 Comprar {config.tokenSymbol}
            </button>
            <a
              href="/Whitepaper_SPRAI_PT.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all border-2 border-yellow-400 hover:bg-yellow-400/10"
              style={{ color: '#FFD700' }}
            >
              📄 Ver Whitepaper (PT)
            </a>
            <a
              href="/Whitepaper_SPRAI_EN.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-bold text-lg transition-all border-2 border-yellow-400 hover:bg-yellow-400/10"
              style={{ color: '#FFD700' }}
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
      <div className="relative py-16 px-4 text-center">
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(46, 139, 87, 0.95) 100%)' }}
        />
        <img
          src="/sprai-banner.png"
          alt="SPRAI Banner"
          className="w-full max-w-2xl mx-auto rounded-2xl anim-zoom-in anim-slow transition-transform duration-300 hover:scale-105 hover:rotate-2"
          style={{ boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)' }}
        />
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-yellow-400/20">
        <p className="text-white/90 mb-2">
          © 2025 {config.tokenSymbol} Token – Todos os direitos reservados.
        </p>
        <p className="text-white/70 text-sm">Contato: support@spraicoin.net</p>
      </footer>
    </div>
  );
};

export default Home;
