import React from 'react';

const LinksSection: React.FC = () => {
  return (
    <section id="links" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
          Connect With Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Telegram */}
          <a
            href="https://t.me/spraicoin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
          >
            <div className="text-5xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-2">Telegram</h3>
            <p className="text-blue-100">Join our community</p>
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/spraicoin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-sky-400 to-sky-500 rounded-lg p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
          >
            <div className="text-5xl mb-4">🐦</div>
            <h3 className="text-xl font-bold mb-2">Twitter</h3>
            <p className="text-sky-100">Follow for updates</p>
          </a>

          {/* Discord */}
          <a
            href="https://discord.gg/spraicoin"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
          >
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2">Discord</h3>
            <p className="text-indigo-100">Chat with us</p>
          </a>

          {/* Website */}
          <a
            href="https://spraicoin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center"
          >
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-2">Website</h3>
            <p className="text-purple-100">Visit our site</p>
          </a>
        </div>

        {/* Contract Addresses (after deployment) */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Smart Contract Addresses
          </h3>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-2">SPRAI Token Contract:</div>
              <div className="font-mono text-sm break-all text-gray-900">
                {/* Will be filled after deployment */}
                To be announced after deployment
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-2">Presale Contract:</div>
              <div className="font-mono text-sm break-all text-gray-900">
                {/* Will be filled after deployment */}
                To be announced after deployment
              </div>
            </div>
            <div className="text-center text-sm text-gray-600 mt-4">
              Always verify contract addresses on our official channels before interacting
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;
