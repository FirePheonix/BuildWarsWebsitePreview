import React from 'react';

export const LoadingCard: React.FC = () => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-800"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-800 rounded mb-3"></div>
        <div className="h-4 bg-gray-800 rounded mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      </div>
    </div>
  );
};
