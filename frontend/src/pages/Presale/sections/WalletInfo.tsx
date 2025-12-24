import React from 'react';
import { useAppSelector } from '../../../store';

const WalletInfo: React.FC = () => {
  const { address, usdtBalance } = useAppSelector((state) => state.wallet);

  if (!address) return null;

  return (
    <div
      className="backdrop-blur-md rounded-2xl p-6 anim-fade-up anim-light-slow anim-delay-200"
      style={{
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      }}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900">Wallet Information</h3>
      <div>
        <div className="flex justify-between items-center pb-4">
          <span className="text-sm text-gray-600">Connected Wallet:</span>
          <span className="text-sm font-mono font-bold text-gray-900 break-all">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <div className="border-t border-gray-200 mb-4" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">USDT Balance:</span>
          <span className="text-base font-bold text-gray-900">
            {parseFloat(usdtBalance).toFixed(2)} USDT
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
