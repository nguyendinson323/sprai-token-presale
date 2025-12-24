import React, { useState, useEffect } from 'react';

interface WalletOption {
  name: string;
  provider: any;
  icon: string;
}

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (provider: any) => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [wallets, setWallets] = useState<WalletOption[]>([]);

  useEffect(() => {
    if (isOpen) {
      detectWallets();
    }
  }, [isOpen]);

  const detectWallets = () => {
    const detected: WalletOption[] = [];

    // Check for multiple providers (EIP-5749)
    if (window.ethereum?.providers?.length) {
      window.ethereum.providers.forEach((provider: any) => {
        if (provider.isMetaMask && !provider.isPhantom) {
          detected.push({ name: 'MetaMask', provider, icon: '🦊' });
        } else if (provider.isPhantom) {
          detected.push({ name: 'Phantom', provider, icon: '👻' });
        } else if (provider.isCoinbaseWallet) {
          detected.push({ name: 'Coinbase Wallet', provider, icon: '🔵' });
        } else if (provider.isTrust) {
          detected.push({ name: 'Trust Wallet', provider, icon: '🛡️' });
        } else if (provider.isBraveWallet) {
          detected.push({ name: 'Brave Wallet', provider, icon: '🦁' });
        } else {
          detected.push({ name: 'Unknown Wallet', provider, icon: '💳' });
        }
      });
    } else if (window.ethereum) {
      // Single provider
      const provider = window.ethereum;
      if (provider.isMetaMask && !provider.isPhantom) {
        detected.push({ name: 'MetaMask', provider, icon: '🦊' });
      } else if (provider.isPhantom) {
        detected.push({ name: 'Phantom', provider, icon: '👻' });
      } else if (provider.isCoinbaseWallet) {
        detected.push({ name: 'Coinbase Wallet', provider, icon: '🔵' });
      } else if (provider.isTrust) {
        detected.push({ name: 'Trust Wallet', provider, icon: '🛡️' });
      } else if (provider.isBraveWallet) {
        detected.push({ name: 'Brave Wallet', provider, icon: '🦁' });
      } else {
        detected.push({ name: 'Browser Wallet', provider, icon: '💳' });
      }
    }

    setWallets(detected);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-md mx-4 p-6"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '6px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 className="text-2xl font-bold text-black mb-2">Connect Wallet</h2>
        <p className="text-black/70 mb-6">Select a wallet to connect</p>

        {wallets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-black/70 mb-4">No wallets detected</p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Install MetaMask
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {wallets.map((wallet, index) => (
              <button
                key={index}
                onClick={() => onSelect(wallet.provider)}
                className="flex items-center gap-4 w-full p-4 border border-black/20 hover:border-black/50 hover:bg-black/5 transition-all"
                style={{ borderRadius: '6px' }}
              >
                <span className="text-3xl">{wallet.icon}</span>
                <span className="text-lg font-semibold text-black">{wallet.name}</span>
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 border border-black/30 text-black font-semibold hover:bg-black/5 transition-all"
          style={{ borderRadius: '6px' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
