import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Convert() {
  const ownedCryptos = [
    { name: 'Ethereum', symbol: 'eth', amount: 3 },
    { name: 'Bitcoin', symbol: 'btc', amount: 1.5 },
  ];

  const [fromCrypto, setFromCrypto] = useState(ownedCryptos[0].name);
  const [amountToConvert, setAmountToConvert] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [allCryptos, setAllCryptos] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch top 100 cryptos from CoinGecko
  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
          },
        });
        setAllCryptos(res.data);
      } catch (error) {
        console.error('Error fetching coin list:', error);
      }
    };

    fetchCryptos();
  }, []);

  const handleConvert = () => {
    if (!amountToConvert || !toCrypto) {
      setMessage('Please select a crypto and enter amount.');
      return;
    }

    const toCryptoName = allCryptos.find(c => c.id === toCrypto)?.name || '';
    setMessage(`✅ Successfully converted ${amountToConvert} ${fromCrypto} to ${toCryptoName}`);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex justify-center items-center p-6">
      <div className="bg-zinc-800 p-6 rounded-xl shadow-xl w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Convert Crypto</h2>

        {/* From */}
        <div className="mb-6">
          <label className="block mb-2">From</label>
          <select
            className="w-full bg-zinc-700 p-3 rounded-lg"
            value={fromCrypto}
            onChange={(e) => setFromCrypto(e.target.value)}
          >
            {ownedCryptos.map((coin) => (
              <option key={coin.symbol} value={coin.name}>
                {coin.name} ({coin.symbol.toUpperCase()}) - {coin.amount} available
              </option>
            ))}
          </select>

          <input
            type="number"
            className="w-full mt-3 bg-zinc-700 p-3 rounded-lg"
            placeholder="Enter amount to convert"
            value={amountToConvert}
            onChange={(e) => setAmountToConvert(e.target.value)}
            min="0"
            step="0.0001"
          />
        </div>

        {/* To */}
        <div className="mb-6">
          <label className="block mb-2">To</label>
          <select
            className="w-full bg-zinc-700 p-3 rounded-lg"
            value={toCrypto}
            onChange={(e) => setToCrypto(e.target.value)}
          >
            <option value="">-- Select Crypto --</option>
            {allCryptos.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-cyan-500 hover:bg-cyan-600 transition rounded-lg py-3 font-bold"
        >
          Convert
        </button>

        {message && (
          <p className="mt-4 text-green-400 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}
