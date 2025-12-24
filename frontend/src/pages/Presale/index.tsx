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
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, rgba(46, 139, 87, 0.95) 0%, rgba(27, 94, 32, 0.85) 50%, rgba(20, 60, 25, 0.95) 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 anim-fade-down anim-light-slow">
          <h1 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: '#FFD700', textShadow: '0 0 20px rgba(255, 215, 0, 0.3)' }}>
            SPRAI Token Presale
          </h1>
          <p className="text-lg sm:text-xl text-white/90">
            Purchase SPRAI tokens with USDT on Binance Smart Chain
          </p>
        </div>

        {/* Connect Wallet Section */}
        {!connected ? (
          <div className="max-w-md mx-auto anim-zoom-in anim-normal anim-delay-200">
            <div
              className="backdrop-blur-md rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="text-7xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-6">
                Connect your MetaMask wallet to participate in the presale
              </p>
              <button
                onClick={handleConnectWallet}
                className="w-full py-4 rounded-lg font-bold text-lg transition-all anim-pulse"
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#000',
                  boxShadow: '0 8px 20px rgba(255, 215, 0, 0.4)',
                }}
              >
                Connect MetaMask
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats and Wallet Info */}
            <div className="lg:col-span-1 space-y-8 anim-fade-left anim-light-slow">
              <PresaleStats />
              <WalletInfo />
            </div>

            {/* Right Column - Purchase Form */}
            <div className="lg:col-span-2 anim-fade-right anim-light-slow">
              <PurchaseForm />

              {/* Transaction History */}
              {transactions.length > 0 && (
                <div
                  className="mt-8 backdrop-blur-md rounded-2xl p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  }}
                >
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
                        {transactions.map((tx, index) => (
                          <tr
                            key={tx.id}
                            className={`border-b hover:bg-gray-50 anim-fade-up anim-normal anim-delay-${index * 100}`}
                          >
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
