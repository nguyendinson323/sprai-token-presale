import React from 'react';
import { useAppSelector } from '../../../store';

const WalletInfo: React.FC = () => {
  const { address, usdtBalance } = useAppSelector((state) => state.wallet);

  if (!address) return null;

  return (
    <div className="bg-white rounded-sm shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Wallet Information</h3>
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3">
          <span className="text-gray-600 mb-1 sm:mb-0">Connected Wallet:</span>
          <span className="font-mono text-sm text-gray-900 break-all">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="text-gray-600 mb-1 sm:mb-0">USDT Balance:</span>
          <span className="font-semibold text-gray-900">
            {parseFloat(usdtBalance).toFixed(2)} USDT
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;
