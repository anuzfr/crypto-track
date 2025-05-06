import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CryptoTable />} />
        {/* Additional routes for /cryptos, /exchanges, etc. can be added */}
      </Routes>
      <Dashboard/>
    
      <Footer/>
    </Router>
  );
}

export default App;