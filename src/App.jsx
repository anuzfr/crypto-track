import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';
import PortfolioTracker from './components/PortfolioTracker';
import InterestSlider from './components/InterestSlider';
import InfoBar from './components/InfoBar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CryptoTable />} />
        {/* Additional routes for /cryptos, /exchanges, etc. can be added */}
      </Routes>
      <PortfolioTracker/>
      <InterestSlider/>
      <InfoBar/>
      <Footer/>
    </Router>
  );
}

export default App;