import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import AllCryptos from './AllCryptos';
import Exchanges from './exchanges';

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center gap-2 hover:brightness-125 transition">
        <img src={logo} alt="Logo" className="w-10 h-10" />
        <span className="text-xl font-bold text-cyan-400">CryptoDash</span>
      </Link>
      <div className="flex items-center gap-6">
        <ul className="flex gap-6 text-lg">

          <li>
          <Link
            to="/cryptos"
            className="hover:text-cyan-400 transition-colors duration-200"
          >
            AllCryptos
          </Link>
          </li>

          <li>
            <Link
              to="/exchanges"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Exchanges
            </Link>
          </li>

          <li>
            <Link
              to="/trade"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Trade
            </Link>
          </li>

          <li>
            <Link
              to="/convert"
              className="hover:text-cyan-400 transition-colors duration-200"
            >
              Convert
            </Link>
          </li>

        </ul>
        <input
          type="text"
          placeholder="🔍 Search coin / token / dexpairs"
          className="px-4 py-2 bg-zinc-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 transition placeholder:text-gray-400 w-68"
        />
      </div>
    </nav>
  );
}