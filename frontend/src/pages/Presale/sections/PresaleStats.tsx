import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchPresaleStats } from '../../../store/slices/transactionSlice';

const PresaleStats: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector((state) => state.transaction);

  useEffect(() => {
    dispatch(fetchPresaleStats());
    const interval = setInterval(() => {
      dispatch(fetchPresaleStats());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Presale Statistics</h3>
        <p className="text-gray-600">Loading statistics...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold mb-6 text-gray-900">Presale Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Total Raised</div>
          <div className="text-2xl font-bold text-blue-900">
            ${parseFloat(stats.totalUsdtRaised).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Tokens Sold</div>
          <div className="text-2xl font-bold text-green-900">
            {parseFloat(stats.totalSpraiSold).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Transactions</div>
          <div className="text-2xl font-bold text-purple-900">
            {stats.totalTransactions}
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
          <div className="text-sm text-gray-600 mb-1">Unique Buyers</div>
          <div className="text-2xl font-bold text-orange-900">
            {stats.uniqueBuyers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresaleStats;
