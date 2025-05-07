import React from 'react';
import bitcoin from '../assets/bitcoin-logo.png';
import eth from '../assets/ethereum-logo.png';
import sol from '../assets/solana-logo.png';
import lite from '../assets/litecoin-logo.png';
import polygon from '../assets/polygon-logo.png';

const InfiniteCarousel = () => {
  const logos = [bitcoin, eth, sol, lite, polygon,
                  bitcoin, eth, sol, lite, polygon,
                  bitcoin, eth, sol, lite, polygon,
                  bitcoin, eth, sol, lite, polygon,
                  bitcoin, eth, sol, lite, polygon,
                  bitcoin, eth, sol, lite, polygon];

  return (
    <div className="overflow-hidden w-full bg-white">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
      <div className="flex animate-marquee " style={{ animation: 'marquee 30s linear infinite' }}>
        {logos.concat(logos).map((logo, index) => (
          <div className="flex-shrink-0 p-2 pb-4 h-15" key={index}>
            <img 
              src={logo} 
              alt="crypto logo" 
              className="w-10 h-auto transform transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteCarousel;