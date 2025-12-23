import React from 'react';
import { config } from '../../../config';

const CampaignSection: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">🌱 Campanhas Ambientais</h2>
        <p className="text-lg sm:text-xl">
          Participe da campanha "Plante e Ganhe {config.tokenSymbol}". Incentive a preservação
          plantando uma Árvore!
        </p>
      </div>
    </section>
  );
};

export default CampaignSection;
