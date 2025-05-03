import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import RefreshButton from './RefreshButton';
import logo from '../assets/logo.png';

export default function CryptoTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const intervalRef = useRef(null);

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchCoins, 10000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [autoRefresh]);

  const toggleAutoRefresh = () => {
    setAutoRefresh((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-zinc-900 text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 overflow-x-auto pb-1">
      <div className="flex flex-wrap justify-start gap-4 mb-6">
        <RefreshButton onClick={fetchCoins} />
        <button
          onClick={toggleAutoRefresh}
          className={`$${
            autoRefresh
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          } text-white font-semibold py-2 px-4 rounded-lg transition`}
        >
          {autoRefresh ? '🛑 Stop Auto Refresh' : '▶️ Start Auto Refresh (10s)'}
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 border border-gray-700 text-left">#</th>
            <th className="p-3 border border-gray-700 text-left">Name</th>
            <th className="p-3 border border-gray-700 text-left">Price ($)</th>
            <th className="p-3 border border-gray-700 text-left">24h High</th>
            <th className="p-3 border border-gray-700 text-left">24h Low</th>
            <th className="p-3 border border-gray-700 text-left">All-Time High</th>
            <th className="p-3 border border-gray-700 text-left">All-Time Low</th>
            <th className="p-3 border border-gray-700 text-left">Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id} className="hover:bg-gray-800 transition">
              <td className="p-3 border border-gray-700">{index + 1}</td>
              <td className="p-3 border border-gray-700 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                {coin.name}{' '}
                <span className="text-gray-400 text-sm">
                  ({coin.symbol.toUpperCase()})
                </span>
              </td>
              <td className="p-3 border border-gray-700">${coin.current_price.toLocaleString()}</td>
              <td className="p-3 border border-gray-700 text-green-400">${coin.high_24h.toLocaleString()}</td>
              <td className="p-3 border border-gray-700 text-red-400">${coin.low_24h.toLocaleString()}</td>
              <td className="p-3 border border-gray-700 text-yellow-300">${coin.ath.toLocaleString()}</td>
              <td className="p-3 border border-gray-700 text-pink-300">${coin.atl.toLocaleString()}</td>
              <td className="p-3 border border-gray-700 text-purple-300">${coin.total_volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
