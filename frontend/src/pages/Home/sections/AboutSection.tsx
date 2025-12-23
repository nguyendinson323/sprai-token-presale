import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-gray-900">
          About SPRAI Token
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              SPRAI Token is a revolutionary BEP-20 token built on the Binance Smart Chain,
              designed to power the next generation of decentralized applications and services.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              With a fixed supply of 2 million tokens and a transparent presale mechanism,
              SPRAI offers early supporters an opportunity to join our growing ecosystem.
            </p>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Fixed supply of 2,000,000 tokens</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Built on Binance Smart Chain (BEP-20)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Automatic token distribution via smart contract</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span className="text-gray-700">Transparent and secure presale mechanism</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Token Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Token Name:</span>
                  <span className="font-semibold text-gray-900">SPRAI TOKEN</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Symbol:</span>
                  <span className="font-semibold text-gray-900">SPRAI</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Total Supply:</span>
                  <span className="font-semibold text-gray-900">2,000,000</span>
                </div>
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="text-gray-600">Network:</span>
                  <span className="font-semibold text-gray-900">BSC (BEP-20)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Decimals:</span>
                  <span className="font-semibold text-gray-900">18</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
