import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InterestSlider() {
  const [interest, setInterest] = useState(50);

  const fetchInterest = async () => {
    try {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/global'
      );
      const btcDominance = data.data.market_cap_percentage.btc;
      const interestValue = 100 - btcDominance; // Assuming more dominance in altcoins lowers BTC percentage
      setInterest(interestValue);
    } catch (error) {
      console.error('Failed to fetch interest data:', error);
    }
  };

  useEffect(() => {
    fetchInterest();
    const interval = setInterval(fetchInterest, 10000);
    return () => clearInterval(interval);
  }, []);

  const getInterestLabel = (value) => {
    if (value < 40) return 'More Interest in Bitcoin';
    if (value > 60) return 'More Interest in Altcoins';
    return 'Balanced Market Interest';
  };

  return (
   <div className="bg-zinc-800 text-white p-6 rounded-3xl shadow-lg w-[250px] h-[200px] flex flex-col justify-between">
      <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">altcoins interest</h2>
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>Bitcoin</span>
        <span>Altcoins</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={interest}
        readOnly
        className="w-full accent-cyan-500 cursor-default"
      />
      <p className="mt-4 text-center text-lg">
        Interest Level: <span className="font-semibold text-cyan-300">{interest.toFixed(2)}</span>
      </p>
      <p className="text-center text-gray-400 italic">{getInterestLabel(interest)}</p>
    </div>
  );
}