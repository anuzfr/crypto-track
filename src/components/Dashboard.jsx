import PortfolioTracker from './PortfolioTracker';
import InterestSlider from './InterestSlider';

export default function Dashboard() {
  return (
    <div className="min-h-[60vh] bg-gray-900 text-white flex flex-col md:flex-row justify-center items-start gap-6 p-6">
      <PortfolioTracker />
      <InterestSlider />
    </div>
  );
}
