import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AllCryptos() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
            },
          }
        );
        setCoins(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch coins:', err);
      }
    };

    fetchCoins();
  }, []);

  if (loading) return <p className="text-center text-white">Loading top 100 cryptocurrencies...</p>;

  return (
    <div className="p-6 text-white bg-zinc-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-cyan-400">Top 100 Cryptocurrencies</h1>
      <ul className="space-y-2">
        {coins.map((coin) => (
          <li
            key={coin.id}
            className="bg-zinc-800 p-4 rounded-lg hover:bg-zinc-700 transition"
          >
            <a
              href={`https://www.coingecko.com/en/coins/${coin.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <img src={coin.image} alt={coin.name} className="w-6 h-6" />
              <span className="font-medium">
                {coin.market_cap_rank}. {coin.name} ({coin.symbol.toUpperCase()})
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
