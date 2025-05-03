import { useState } from 'react';

export default function PortfolioTracker() {
  const [portfolio, setPortfolio] = useState([]);
  const [name, setName] = useState('');
  const [usd, setUsd] = useState('');
  const [count, setCount] = useState('');
  const [sellingIndex, setSellingIndex] = useState(null);
  const [sellAmount, setSellAmount] = useState('');

  const handleAdd = () => {
    const usdValue = parseFloat(usd);
    const coinCount = parseFloat(count);
    if (!name || isNaN(usdValue) || isNaN(coinCount)) return;

    const existing = portfolio.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.amount += usdValue;
      existing.coins += coinCount;
      setPortfolio([...portfolio]);
    } else {
      setPortfolio([...portfolio, { name, amount: usdValue, coins: coinCount }]);
    }
    setName('');
    setUsd('');
    setCount('');
  };

  const confirmSell = (index) => {
    const amountToSell = parseFloat(sellAmount);
    if (isNaN(amountToSell) || amountToSell <= 0) return;

    const updated = [...portfolio];
    const entry = updated[index];
    if (amountToSell >= entry.coins) {
      updated.splice(index, 1);
    } else {
      const pricePerCoin = entry.amount / entry.coins;
      entry.coins -= amountToSell;
      entry.amount = entry.coins * pricePerCoin;
    }
    setPortfolio(updated);
    setSellingIndex(null);
    setSellAmount('');
  };

  const total = portfolio.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md ml-10  ">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Crypto Portfolio</h2>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Crypto Name (e.g., BTC)"
          className="p-2 rounded bg-gray-700 text-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total USD Spent"
          className="p-2 rounded bg-gray-700 text-white"
          value={usd}
          onChange={(e) => setUsd(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Coins Bought"
          className="p-2 rounded bg-gray-700 text-white"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 hover:bg-green-700 py-2 px-4 rounded text-white font-semibold"
        >
          ➕ Add Crypto
        </button>
      </div>
      <ul className="space-y-2">
        {portfolio.map((entry, index) => (
          <li key={index} className="bg-gray-700 p-2 rounded">
            <div className="flex justify-between items-center">
              <span>{entry.name.toUpperCase()}: ${entry.amount.toFixed(2)} ({entry.coins} coins)</span>
              {sellingIndex === index ? (
                <></>
              ) : (
                <button
                  onClick={() => {
                    setSellingIndex(index);
                    setSellAmount('');
                  }}
                  className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white text-sm"
                >
                  Sell
                </button>
              )}
            </div>
            {sellingIndex === index && (
              <div className="mt-2">
                <input
                  type="number"
                  placeholder="Amount to Sell"
                  className="p-1 w-full rounded bg-gray-600 text-white text-sm mb-1"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => confirmSell(index)}
                    className="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1 text-sm"
                  >
                    Confirm Sell
                  </button>
                  <button
                    onClick={() => {
                      setSellingIndex(null);
                      setSellAmount('');
                    }}
                    className="text-xs text-gray-400 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 font-semibold text-lg">
        Total Value: <span className="text-green-400">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
