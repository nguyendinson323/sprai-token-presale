import React from 'react';
import { config } from '../../../config';

const LinksSection: React.FC = () => {
  const buttonStyle = {
    backgroundColor: '#2E7D32',
    border: '2px solid #1B5E20',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">🔗 Links Oficiais</h2>

        {/* Contract Link */}
        {config.spraiTokenContract && (
          <div className="mb-6">
            <a
              href={`${config.blockExplorerUrl}address/${config.spraiTokenContract}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={buttonStyle}
            >
              ✅ Contrato Verificado (BscScan)
            </a>
          </div>
        )}

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-3">
          {config.instagramUrl && (
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={buttonStyle}
            >
              📸 Instagram
            </a>
          )}
          {config.facebookUrl && (
            <a
              href={config.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={buttonStyle}
            >
              📘 Facebook
            </a>
          )}
          {config.twitterUrl && (
            <a
              href={config.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={buttonStyle}
            >
              🐦 Twitter (X)
            </a>
          )}
          {config.telegramUrl && (
            <a
              href={config.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-bold text-white transition-all hover:opacity-90"
              style={buttonStyle}
            >
              💬 Telegram
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
