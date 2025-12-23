import React from 'react';
import AboutSection from './sections/AboutSection';
import CampaignSection from './sections/CampaignSection';
import FAQSection from './sections/FAQSection';
import LinksSection from './sections/LinksSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to SPRAI Token
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-blue-100">
            Join the Future of Decentralized Finance
          </p>
          <p className="text-lg sm:text-xl mb-12 max-w-3xl mx-auto text-blue-50">
            Participate in our presale and be part of the next generation blockchain ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/presale"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg transform hover:scale-105"
            >
              Join Presale Now
            </a>
            <a
              href="#about"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Sections */}
      <AboutSection />
      <CampaignSection />
      <FAQSection />
      <LinksSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 SPRAI Token. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Built on Binance Smart Chain
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
