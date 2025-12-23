import React from 'react';
import { config } from '../../../config';

const AboutSection: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <p className="text-lg sm:text-xl mb-6">
          🌱 <strong>{config.tokenSymbol}</strong> é um token brasileiro construído na{' '}
          <strong>BNB Smart Chain</strong> com o objetivo de unir tecnologia, cultura local e
          sustentabilidade. Com foco em um futuro descentralizado e responsável.
        </p>
        <p className="text-lg sm:text-xl">
          📊 <strong>Supply:</strong> {config.tokenTotalSupply.toLocaleString()} {config.tokenSymbol}
          <br />
          🔗 <strong>Blockchain:</strong> BNB Smart Chain
          <br />
          🌱 <strong>Utilidade:</strong> Incentivo ambiental + comunidade token com propósito.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
