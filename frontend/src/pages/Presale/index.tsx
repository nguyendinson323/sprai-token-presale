import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { connectWallet } from '../../store/slices/walletSlice';
import { fetchUserTransactions } from '../../store/slices/transactionSlice';
import WalletInfo from './sections/WalletInfo';
import PurchaseForm from './sections/PurchaseForm';
import PresaleStats from './sections/PresaleStats';

const Presale: React.FC = () => {
  const dispatch = useAppDispatch();
  const { address, connected } = useAppSelector((state) => state.wallet);
  const { transactions } = useAppSelector((state) => state.transaction);

  useEffect(() => {
    if (address) {
      dispatch(fetchUserTransactions(address));
    }
  }, [address, dispatch]);

  const handleConnectWallet = async () => {
    await dispatch(connectWallet());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            SPRAI Token Presale
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Purchase SPRAI tokens with USDT on Binance Smart Chain
          </p>
        </div>

        {/* Connect Wallet Section */}
        {!connected ? (
          <div className="max-w-md mx-auto bg-white rounded-sm shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Connect Your Wallet</h2>
            <p className="text-gray-600 mb-6">
              Connect your MetaMask wallet to participate in the presale
            </p>
            <button
              onClick={handleConnectWallet}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-sm font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Connect MetaMask
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats and Wallet Info */}
            <div className="lg:col-span-1 space-y-8">
              <PresaleStats />
              <WalletInfo />
            </div>

            {/* Right Column - Purchase Form */}
            <div className="lg:col-span-2">
              <PurchaseForm />

              {/* Transaction History */}
              {transactions.length > 0 && (
                <div className="mt-8 bg-white rounded-sm shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Your Transactions</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="px-4 py-3 text-left text-gray-700">Date</th>
                          <th className="px-4 py-3 text-left text-gray-700">USDT</th>
                          <th className="px-4 py-3 text-left text-gray-700">SPRAI</th>
                          <th className="px-4 py-3 text-left text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-900">
                              {new Date(tx.timestamp).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3 text-gray-900">
                              {parseFloat(tx.usdtAmount).toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-gray-900">
                              {parseFloat(tx.spraiAmount).toFixed(2)}
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                  tx.validated
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {tx.validated ? 'Validated' : 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Presale;
