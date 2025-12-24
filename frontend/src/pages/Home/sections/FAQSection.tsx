import React from 'react';
import { config } from '../../../config';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      q: `A ${config.tokenSymbol} é segura?`,
      a: 'Sim, nosso contrato é verificado e a liquidez está travada na Mudra.',
      delay: '200',
      animation: 'fade-left',
    },
    {
      q: `Como compro ${config.tokenSymbol}?`,
      a: `Basta clicar no botão "Comprar ${config.tokenSymbol}", conectar sua MetaMask e confirmar a transação.`,
      delay: '400',
      animation: 'fade-right',
    },
  ];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-3xl">
        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 anim-zoom-in anim-normal"
          style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}
        >
          ❓ FAQ (Perguntas Frequentes)
        </h2>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border-l-4 border-yellow-400 rounded-lg p-8 transition-all duration-300 hover:border-l-8 hover:translate-x-2 anim-${faq.animation} anim-light-slow anim-delay-${faq.delay}`}
            >
              <h3 className="text-yellow-400 text-lg font-bold mb-3">Q: {faq.q}</h3>
              <p className="text-white/85 text-base leading-relaxed">R: {faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
