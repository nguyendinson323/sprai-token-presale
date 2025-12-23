import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { submitPurchase } from '../../../store/slices/transactionSlice';
import { config } from '../../../config';
import web3Service from '../../../services/web3Service';

const PurchaseForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { address, usdtBalance } = useAppSelector((state) => state.wallet);
  const { loading } = useAppSelector((state) => state.transaction);

  const [usdtAmount, setUsdtAmount] = useState<string>('');
  const [spraiAmount, setSpraiAmount] = useState<string>('0.00');

  const handleUsdtChange = (value: string) => {
    setUsdtAmount(value);
    const numValue = parseFloat(value) || 0;
    setSpraiAmount(web3Service.calculateSpraiAmount(numValue));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    const amount = parseFloat(usdtAmount);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (amount < config.minPurchaseUsdt) {
      alert(`Minimum purchase is ${config.minPurchaseUsdt} USDT`);
      return;
    }

    if (amount > config.maxPurchaseUsdt) {
      alert(`Maximum purchase is ${config.maxPurchaseUsdt} USDT`);
      return;
    }

    if (amount > parseFloat(usdtBalance)) {
      alert('Insufficient USDT balance');
      return;
    }

    await dispatch(submitPurchase({ usdtAmount, address }));
    setUsdtAmount('');
    setSpraiAmount('0.00');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Purchase SPRAI Tokens</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* USDT Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Pay (USDT)
          </label>
          <input
            type="number"
            step="0.01"
            min={config.minPurchaseUsdt}
            max={config.maxPurchaseUsdt}
            value={usdtAmount}
            onChange={(e) => handleUsdtChange(e.target.value)}
            placeholder="Enter USDT amount"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            disabled={loading || !address}
          />
          <p className="text-sm text-gray-500 mt-1">
            Min: ${config.minPurchaseUsdt} | Max: ${config.maxPurchaseUsdt}
          </p>
        </div>

        {/* SPRAI Amount Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            You will receive (SPRAI)
          </label>
          <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 font-semibold text-lg">
            {spraiAmount} SPRAI
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Price: ${config.tokenPriceUsdt} USDT per SPRAI
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !address || !usdtAmount}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-105 disabled:transform-none shadow-lg"
        >
          {loading ? 'Processing...' : 'Buy SPRAI Tokens'}
        </button>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Important Information</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Tokens are sent automatically after confirmation</li>
            <li>• Make sure you have enough USDT on BSC network</li>
            <li>• Transaction requires two MetaMask confirmations</li>
            <li>• Gas fees are paid separately in BNB</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default PurchaseForm;
