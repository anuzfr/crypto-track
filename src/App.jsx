import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import InfiniteCarousel from './components/InfiniteCarousel';
import AllCryptos from './components/AllCryptos';
import Convert from './components/Convert';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CryptoTable />} />
        <Route path="/cryptos" element={<AllCryptos />} />
        <Route path="/convert" element={<Convert />} />
        {/* Additional routes for /cryptos, /exchanges, etc. can be added */}
      </Routes>
      <Dashboard/>
      <InfiniteCarousel/>
      <Footer/>
    </Router>
  );
}

export default App;