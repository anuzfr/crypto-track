import React, { useState, useEffect } from 'react';

// Main Exchanges component
export default function Exchanges() {
  // State to hold crypto data
  const [cryptoPairs, setCryptoPairs] = useState([]);

  // Simulate fetching data on component mount
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // For demonstration, we'll use mock data, now with more newly launched ones at the top.
    const mockData = [
      // Newly launched crypto pairs (now more prominent and numerous)
      { id: '9', pair: 'BLAST/USDT', exchange: 'Maverick Protocol', price: 0.87, change24h: 15.2, isNew: true },
      { id: '10', pair: 'Mantle/ETH', exchange: 'Balancer V2', price: 0.00021, change24h: 8.9, isNew: true },
      { id: '11', pair: 'SEI/USDC', exchange: 'Osmosis', price: 0.55, change24h: 6.7, isNew: true },
      { id: '12', pair: 'PYTH/USDT', exchange: 'Jupiter', price: 0.32, change24h: 12.0, isNew: true },
      { id: '13', pair: 'JUP/USDC', exchange: 'Raydium', price: 1.15, change24h: 9.8, isNew: true }, // Added new
      { id: '14', pair: 'STRK/ETH', exchange: 'Jediswap', price: 0.00089, change24h: 7.5, isNew: true }, // Added new
      { id: '15', pair: 'TIA/USDT', exchange: 'Dymension', price: 11.20, change24h: 5.3, isNew: true }, // Added new
      { id: '16', pair: 'SUI/USDC', exchange: 'MovEx', price: 1.01, change24h: 6.1, isNew: true }, // Added new

      // Older/established crypto pairs (fewer for variety)
      { id: '1', pair: 'ETH/USDT', exchange: 'Uniswap V3', price: 3850.23, change24h: 2.5 },
      { id: '2', pair: 'BTC/USDC', exchange: 'PancakeSwap V2', price: 68900.50, change24h: -1.2 },
      { id: '3', pair: 'SOL/USDT', exchange: 'SushiSwap', price: 175.89, change24h: 4.1 },
      { id: '4', pair: 'AVAX/ETH', exchange: 'Trader Joe', price: 0.052, change24h: -0.8 },
    ];
    setCryptoPairs(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 lg:p-8 font-inter text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-4 sm:p-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-400">
          Decentralized Exchange Price Tracker
        </h1>

        {/* Crypto pairs list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cryptoPairs.map((pair) => (
            <div
              key={pair.id}
              className="bg-gray-700 rounded-lg p-5 shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-gray-600 border border-gray-600"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-semibold text-white">{pair.pair}</span>
                <span className="text-sm font-medium text-gray-300 px-3 py-1 bg-gray-600 rounded-full">
                  {pair.exchange}
                </span>
              </div>
              <div className="text-3xl font-bold mb-2 text-green-400">
                ${pair.price.toFixed(pair.price < 1 ? 5 : 2)} {/* Adjust precision for smaller values */}
              </div>
              <div className="flex items-center text-sm">
                <span className={`font-medium ${pair.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {pair.change24h >= 0 ? '▲' : '▼'} {pair.change24h.toFixed(2)}% (24h)
                </span>
                {pair.isNew && (
                  <span className="ml-2 text-xs font-bold text-purple-300 bg-purple-700 px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-gray-400 text-sm mt-8 p-4 bg-gray-700 rounded-lg">
          Prices are simulated and for demonstration purposes only. Not real-time data.
        </p>
      </div>
    </div>
  );
}