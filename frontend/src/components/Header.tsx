import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { connectWallet, disconnectWallet } from '../store/slices/walletSlice';
import { config } from '../config';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { address, connected } = useAppSelector((state) => state.wallet);
  const { isLoading, loadingMessage } = useAppSelector((state) => state.ui);

  const handleConnectWallet = async () => {
    await dispatch(connectWallet());
  };

  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet());
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo with Network Badge */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">SPRAI</span>
              <span className="text-2xl sm:text-3xl font-light text-gray-700 ml-1">Token</span>
            </Link>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                config.isMainnet
                  ? 'bg-green-100 text-green-800'
                  : 'bg-orange-100 text-orange-800'
              }`}
            >
              {config.isMainnet ? 'MAINNET' : 'TESTNET'}
            </span>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-lg font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/presale"
              className={`text-lg font-medium transition-colors ${
                isActive('/presale')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Presale
            </Link>
          </nav>

          {/* Wallet Button */}
          <div>
            {connected && address ? (
              <button
                onClick={handleDisconnectWallet}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-sm sm:text-base"
              >
                <span className="hidden sm:inline">
                  {address.slice(0, 6)}...{address.slice(-4)}
                </span>
                <span className="sm:hidden">
                  {address.slice(0, 4)}...{address.slice(-2)}
                </span>
              </button>
            ) : (
              <button
                onClick={handleConnectWallet}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:from-gray-400 disabled:to-gray-500 shadow-md text-sm sm:text-base"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex space-x-4 pb-4">
          <Link
            to="/"
            className={`flex-1 text-center py-2 rounded-sm font-medium transition-colors ${
              isActive('/')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Home
          </Link>
          <Link
            to="/presale"
            className={`flex-1 text-center py-2 rounded-sm font-medium transition-colors ${
              isActive('/presale')
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Presale
          </Link>
        </nav>
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div className="w-full bg-blue-100 border-t border-blue-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm text-blue-800">{loadingMessage || 'Loading...'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
