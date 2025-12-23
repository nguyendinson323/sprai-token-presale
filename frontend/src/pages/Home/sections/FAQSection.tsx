import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is SPRAI Token?',
    answer: 'SPRAI Token is a BEP-20 token built on the Binance Smart Chain with a fixed supply of 2 million tokens. It is designed to power decentralized applications and services within our ecosystem.',
  },
  {
    question: 'How do I participate in the presale?',
    answer: 'Connect your MetaMask wallet, ensure you have USDT on BSC network, enter the amount you want to invest (minimum $10, maximum $10,000), and confirm the transaction. SPRAI tokens will be automatically sent to your wallet.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'The presale accepts USDT (BEP-20) on the Binance Smart Chain. Make sure your wallet is connected to BSC network and has sufficient USDT balance.',
  },
  {
    question: 'When will I receive my tokens?',
    answer: 'Tokens are distributed automatically and instantly through our smart contract. As soon as your transaction is confirmed on the blockchain, SPRAI tokens will appear in your wallet.',
  },
  {
    question: 'What is the token price?',
    answer: 'The presale price is $0.50 USDT per SPRAI token. This is a special early supporter price with no further discounts or bonuses.',
  },
  {
    question: 'Is there a minimum or maximum purchase limit?',
    answer: 'Yes, the minimum purchase is $10 USDT and the maximum purchase is $10,000 USDT per transaction. You can make multiple transactions if needed.',
  },
  {
    question: 'Is the presale secure?',
    answer: 'Yes, the presale is powered by audited smart contracts on Binance Smart Chain. All transactions are transparent and verifiable on-chain. We do not hold any funds - everything is handled automatically by the smart contract.',
  },
  {
    question: 'Can I add SPRAI token to my wallet?',
    answer: 'Yes, after receiving your tokens, you can add the SPRAI token contract address to MetaMask to view your balance. The contract address will be provided after deployment.',
  },
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <span className="text-2xl text-blue-600 flex-shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
