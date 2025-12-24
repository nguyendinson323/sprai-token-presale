import React from 'react';
import { config } from '../../../config';

const AboutSection: React.FC = () => {
  const features = [
    { icon: '🌱', text: 'Sustentabilidade', delay: '200' },
    { icon: '🔗', text: 'BNB Smart Chain', delay: '300' },
    { icon: '📊', text: `${config.tokenTotalSupply.toLocaleString()} Supply`, delay: '400' },
    { icon: '💎', text: 'Token com Propósito', delay: '500' },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div
        className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(46, 139, 87, 0.95) 100%)' }}
      />

      <div className="container mx-auto max-w-6xl">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 anim-zoom-in anim-normal"
          style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
        >
          Sobre o {config.tokenSymbol}
        </h2>

        <p className="text-lg sm:text-xl text-center mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed anim-fade-up anim-light-slow anim-delay-200">
          🌱 <strong>{config.tokenSymbol}</strong> é um token brasileiro construído na{' '}
          <strong>BNB Smart Chain</strong> com o objetivo de unir tecnologia, cultura local e
          sustentabilidade. Com foco em um futuro descentralizado e responsável.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border border-yellow-400/30 rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/60 anim-flip-up anim-normal anim-delay-${feature.delay}`}
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-yellow-400 text-lg font-bold">{feature.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
