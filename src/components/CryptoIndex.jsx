import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';

const CryptoIndex = () => {
  const [priceData, setPriceData] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [changePercent, setChangePercent] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: true,
              price_change_percentage: '24h',
            },
          }
        );

        const coins = res.data;

        // Filter coins that have sparkline data
        const validCoins = coins.filter(
          (c) => c.sparkline_in_7d?.price?.length
        );

        if (validCoins.length === 0) return;

        const sparklineLength = validCoins[0].sparkline_in_7d.price.length;

        // Build index sparkline by averaging each point
        const indexSparkline = Array.from({ length: sparklineLength }).map(
          (_, i) => {
            let sum = 0;
            for (let coin of validCoins) {
              sum += coin.sparkline_in_7d.price[i];
            }
            return { value: sum / validCoins.length };
          }
        );

        const start = indexSparkline[0].value;
        const end = indexSparkline[sparklineLength - 1].value;
        const percent = ((end - start) / start) * 100;

        setPriceData(indexSparkline);
        setCurrentValue(end.toFixed(2));
        setChangePercent(percent.toFixed(2));
      } catch (err) {
        console.error('Error fetching crypto data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-50 w-[250px] bg-zinc-800 text-white rounded-3xl p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">CT 100</span>
        <span className="text-gray-500">{'>'}</span>
      </div>

      <div className="text-2xl font-bold mb-1">${currentValue}</div>
      <div
        className={`text-sm font-medium ${
          changePercent >= 0 ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {changePercent >= 0 ? '▲' : '▼'} {Math.abs(changePercent)}%
      </div>

      <div className="h-24 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={priceData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={changePercent >= 0 ? '#22c55e' : '#ef4444'}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CryptoIndex;