import React from 'react';
import { config } from '../../../config';

const CampaignSection: React.FC = () => {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 anim-flip-down anim-normal"
          style={{ color: '#2E8B57', textShadow: '0 0 20px rgba(46, 139, 87, 0.3)' }}
        >
          🌱 Campanhas Ambientais
        </h2>

        <div
          className="border-2 border-green-600/30 rounded-3xl p-12 text-center transition-all duration-300 hover:scale-105 hover:border-green-600/60 anim-zoom-in anim-slow anim-delay-200"
        >
          <div className="text-7xl mb-6 anim-floating">🌳</div>
          <p className="text-white/95 text-xl sm:text-2xl leading-relaxed">
            Participe da campanha <strong className="text-green-600">"Plante e Ganhe {config.tokenSymbol}"</strong>.
            Incentive a preservação plantando uma Árvore!
          </p>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
