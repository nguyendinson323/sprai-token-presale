import React from 'react';
import { config } from '../../../config';

const FAQSection: React.FC = () => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">❓ FAQ (Perguntas Frequentes)</h2>
        <div className="text-left space-y-4 text-base sm:text-lg">
          <p>
            <strong>Q:</strong> A {config.tokenSymbol} é segura?
            <br />
            <strong>R:</strong> Sim, nosso contrato é verificado e a liquidez está travada na Mudra.
          </p>
          <p>
            <strong>Q:</strong> Como compro {config.tokenSymbol}?
            <br />
            <strong>R:</strong> Basta clicar no botão "Comprar {config.tokenSymbol}", conectar sua
            MetaMask e confirmar a transação.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
