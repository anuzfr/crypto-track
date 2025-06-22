import PortfolioTracker from './tools/PortfolioTracker';
import InterestSlider from './tools/InterestSlider';
import CryptoIndex from './tools/CryptoIndex';

export default function Dashboard() {
  return (
    <div className="flex justify-start items-start min-h-[60vh] bg-gray-900 text-white flex flex-col md:flex-row justify-center items-start gap-6 p-6">
      <PortfolioTracker />
      <div className='flex-col'>
        <InterestSlider />
        <CryptoIndex />
      </div>
      
    </div>
  );
}
