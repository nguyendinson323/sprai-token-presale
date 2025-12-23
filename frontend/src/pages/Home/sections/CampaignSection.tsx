import React from 'react';
import { config } from '../../../config';

const CampaignSection: React.FC = () => {
  return (
    <section id="campaign" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
          Presale Campaign
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Token Price Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Token Price</h3>
              <div className="text-5xl font-bold mb-2">${config.tokenPriceUsdt}</div>
              <p className="text-blue-100">per SPRAI</p>
            </div>
          </div>

          {/* Min Purchase Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Minimum Purchase</h3>
              <div className="text-5xl font-bold mb-2">${config.minPurchaseUsdt}</div>
              <p className="text-green-100">USDT</p>
            </div>
          </div>

          {/* Max Purchase Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 text-white shadow-xl transform hover:scale-105 transition-transform">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Maximum Purchase</h3>
              <div className="text-5xl font-bold mb-2">${config.maxPurchaseUsdt.toLocaleString()}</div>
              <p className="text-purple-100">USDT</p>
            </div>
          </div>
        </div>

        {/* How to Participate */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            How to Participate
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Connect Wallet</h4>
              <p className="text-sm text-gray-600">
                Connect your MetaMask wallet to the presale platform
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Enter Amount</h4>
              <p className="text-sm text-gray-600">
                Enter the USDT amount you want to invest
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Confirm Purchase</h4>
              <p className="text-sm text-gray-600">
                Approve and confirm the transaction in MetaMask
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h4 className="font-semibold mb-2 text-gray-900">Receive Tokens</h4>
              <p className="text-sm text-gray-600">
                SPRAI tokens automatically sent to your wallet
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;
