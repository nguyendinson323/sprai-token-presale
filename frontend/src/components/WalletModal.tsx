import React, { useEffect, useState } from 'react';

interface WalletOption {
  name: string;
  icon: string;
  installed: boolean;
  provider: any;
  installUrl: string;
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
    const providers: any[] = [];

    // Collect all providers from window.ethereum.providers array
    if (window.ethereum?.providers && Array.isArray(window.ethereum.providers)) {
      providers.push(...window.ethereum.providers);
    }

    // Also add window.ethereum itself
    if (window.ethereum) {
      providers.push(window.ethereum);
    }

    // Check for specific wallet globals
    const okxWallet = (window as any).okxwallet;
    const binanceWallet = (window as any).BinanceChain;
    const trustWallet = (window as any).trustwallet?.ethereum;
    const phantomEth = (window as any).phantom?.ethereum;
    const coinbaseWallet = (window as any).coinbaseWalletExtension;

    if (okxWallet && !providers.includes(okxWallet)) providers.push(okxWallet);
    if (binanceWallet && !providers.includes(binanceWallet)) providers.push(binanceWallet);
    if (trustWallet && !providers.includes(trustWallet)) providers.push(trustWallet);
    if (phantomEth && !providers.includes(phantomEth)) providers.push(phantomEth);
    if (coinbaseWallet && !providers.includes(coinbaseWallet)) providers.push(coinbaseWallet);

    // Remove duplicates by reference
    const uniqueProviders = providers.filter((p, i, arr) => arr.indexOf(p) === i);

    // Debug: log all provider properties
    console.log('=== WALLET DETECTION DEBUG ===');
    uniqueProviders.forEach((p, i) => {
      console.log(`Provider ${i}:`, {
        isMetaMask: p.isMetaMask,
        isPhantom: p.isPhantom,
        isTrust: p.isTrust,
        isTrustWallet: p.isTrustWallet,
        isCoinbaseWallet: p.isCoinbaseWallet,
        isBraveWallet: p.isBraveWallet,
        isOkxWallet: p.isOkxWallet,
        isBinance: p.isBinance,
        _isPhantom: p._isPhantom,
        constructor: p.constructor?.name,
      });
    });

    // Helper to check provider flags safely
    const hasFlag = (p: any, ...flags: string[]) => {
      return flags.some(flag => {
        try {
          return p[flag] === true;
        } catch {
          return false;
        }
      });
    };

    // Detect MetaMask (but not Phantom pretending to be MetaMask)
    const metaMaskProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isMetaMask') &&
      !hasFlag(p, 'isPhantom', '_isPhantom') &&
      !hasFlag(p, 'isBraveWallet')
    );
    detected.push({
      name: 'MetaMask',
      icon: '🦊',
      installed: !!metaMaskProvider,
      provider: metaMaskProvider || null,
      installUrl: 'https://metamask.io/download/',
    });

    // Detect Phantom
    const phantomProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isPhantom', '_isPhantom')
    ) || phantomEth;
    detected.push({
      name: 'Phantom',
      icon: '👻',
      installed: !!phantomProvider,
      provider: phantomProvider || null,
      installUrl: 'https://phantom.app/download',
    });

    // Detect Trust Wallet
    const trustProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isTrust', 'isTrustWallet')
    ) || trustWallet;
    detected.push({
      name: 'Trust Wallet',
      icon: '🛡️',
      installed: !!trustProvider,
      provider: trustProvider || null,
      installUrl: 'https://trustwallet.com/download',
    });

    // Detect Coinbase Wallet
    const coinbaseProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isCoinbaseWallet', 'isCoinbaseBrowser')
    ) || coinbaseWallet;
    detected.push({
      name: 'Coinbase Wallet',
      icon: '🔵',
      installed: !!coinbaseProvider,
      provider: coinbaseProvider || null,
      installUrl: 'https://www.coinbase.com/wallet/downloads',
    });

    // Detect Brave Wallet
    const braveProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isBraveWallet')
    );
    detected.push({
      name: 'Brave Wallet',
      icon: '🦁',
      installed: !!braveProvider,
      provider: braveProvider || null,
      installUrl: 'https://brave.com/wallet/',
    });

    // Detect OKX Wallet
    const okxProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isOkxWallet', 'isOKExWallet')
    ) || okxWallet;
    detected.push({
      name: 'OKX Wallet',
      icon: '⭕',
      installed: !!okxProvider,
      provider: okxProvider || null,
      installUrl: 'https://www.okx.com/web3',
    });

    // Detect Binance Wallet
    const binanceProvider = uniqueProviders.find(p =>
      hasFlag(p, 'isBinance', 'isBinanceChain')
    ) || binanceWallet;
    detected.push({
      name: 'Binance Wallet',
      icon: '🟡',
      installed: !!binanceProvider,
      provider: binanceProvider || null,
      installUrl: 'https://www.binance.com/en/web3wallet',
    });

    // Log results
    console.log('Detected wallets:', detected.filter(w => w.installed).map(w => w.name));
    console.log('All wallet options:', detected);

    setWallets(detected);
  };

  const handleWalletClick = (wallet: WalletOption) => {
    if (wallet.installed && wallet.provider) {
      onSelect(wallet.provider);
    } else {
      window.open(wallet.installUrl, '_blank');
    }
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

        <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleWalletClick(wallet)}
              className="flex items-center justify-between w-full p-4 border border-black/20 hover:border-black/50 hover:bg-black/5 transition-all"
              style={{ borderRadius: '6px' }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{wallet.icon}</span>
                <span className="text-lg font-semibold text-black">{wallet.name}</span>
              </div>
              {wallet.installed ? (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 font-medium" style={{ borderRadius: '6px' }}>
                  Installed
                </span>
              ) : (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 font-medium" style={{ borderRadius: '6px' }}>
                  Install
                </span>
              )}
            </button>
          ))}
        </div>

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
