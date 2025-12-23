import React from 'react';
import { config } from '../../../config';

const LinksSection: React.FC = () => {
  // Social links from config
  const socialLinks = [
    {
      name: 'Telegram',
      url: config.telegramUrl,
      icon: '📱',
      description: 'Join our community',
      gradient: 'from-blue-400 to-blue-500',
      textColor: 'text-blue-100',
    },
    {
      name: 'Twitter',
      url: config.twitterUrl,
      icon: '🐦',
      description: 'Follow for updates',
      gradient: 'from-sky-400 to-sky-500',
      textColor: 'text-sky-100',
    },
    {
      name: 'Discord',
      url: config.discordUrl,
      icon: '💬',
      description: 'Chat with us',
      gradient: 'from-indigo-400 to-indigo-500',
      textColor: 'text-indigo-100',
    },
    {
      name: 'Website',
      url: config.websiteUrl,
      icon: '🌐',
      description: 'Visit our site',
      gradient: 'from-purple-400 to-purple-500',
      textColor: 'text-purple-100',
    },
  ];

  // Filter out links that are not configured
  const activeSocialLinks = socialLinks.filter(link => link.url);

  return (
    <section id="links" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 text-gray-900">
          Connect With Us
        </h2>
        {activeSocialLinks.length > 0 ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(activeSocialLinks.length, 4)} gap-8`}>
            {activeSocialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${link.gradient} rounded-lg p-8 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-center`}
              >
                <div className="text-5xl mb-4">{link.icon}</div>
                <h3 className="text-xl font-bold mb-2">{link.name}</h3>
                <p className={link.textColor}>{link.description}</p>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Social links will be added soon.</p>
        )}

        {/* Contract Addresses (after deployment) */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Smart Contract Addresses
          </h3>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-2">{config.tokenSymbol} Token Contract:</div>
              <div className="font-mono text-sm break-all text-gray-900">
                {config.spraiTokenContract || 'To be announced after deployment'}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <div className="text-sm text-gray-600 mb-2">Presale Contract:</div>
              <div className="font-mono text-sm break-all text-gray-900">
                {config.presaleContract || 'To be announced after deployment'}
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
